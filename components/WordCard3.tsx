import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Database } from '../types_db';
type DataBase3000 = Database['public']['Tables']['database3000']['Row'];
type Wordlist = Database['public']['Tables']['wordlist']['Row'];
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function WordCard3({wordcard3}: {wordcard3:DataBase3000}) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const [flg1, setFlag1] = useState(true);
  const [flg2, setFlag2] = useState(true);
  const [flg3, setFlag3] = useState(true);
  const [addflg, setAddflg] = useState(false);
  const [addstr, setAddstr] = useState('+');

  useEffect(() => {
    init();
  }, [wordcard3]);

  const init = async () =>{
    if (!session?.user){
      return;
    }
    let { data: wordlist, error } = await supabase.from('wordlist').select('*').order('id', { ascending: true })
                                                  .eq('wordid',wordcard3.id).eq('userid',session?.user.id);
    if(wordlist?.length??0 > 0 ){
      setAddflg(true);
      setAddstr('-');
    }
  }

  const recClick = async (i:string) =>{
    if(!session?.user) {
      alert('Pls log in.');
      return;
    }
    const userid = session.user.id;
    const type = 0;

    if(addflg){
      const {
        error,
        data
      } = await supabase.from('wordlist').delete().eq('userid',userid).eq('wordid',wordcard3.id);

      if (error) {
        console.log('error', error);
      }
      else {
        setAddflg(false);
        setAddstr('+');
      }
    } else {
      const {
        error,
        data
      } = await supabase.from('wordlist').insert({userid:userid, type:0, wordid:wordcard3.id})
      .select('*')
      .single();

      if (error) {
        console.log('error', error);
      }
      else {
        setAddflg(true);
        setAddstr('-');
      }
    }
  }


  return(
    <div className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        <div className='rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900'>
          <div className="flex flex-row-reverse">
            <button type="button" onClick={()=>{recClick(wordcard3.id)}} className="rounded-full bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-900">
              {addstr}
            </button>
          </div>
          <div className="p-6">
            <div onClick={()=>{
              setFlag1(!flg1);
            }} className="hover:cursor-pointer">
              <h2 className={cn("text-2xl leading-6 font-semibold text-white",
              {
                "invisible":!flg1
              })}>
                {wordcard3.english}
              </h2>
            </div>
            <div onClick={()=>{
              setFlag2(!flg2);
            }} className="hover:cursor-pointer">
              <div className={cn("mt-4 text-zinc-300",
              {
                "invisible":!flg2
              })}>{wordcard3.japanese}</div>
            </div>
            <div onClick={()=>{
              setFlag3(!flg3);
            }} className="hover:cursor-pointer">
              <div className={cn("mt-4 text-zinc-300",
              {
                "invisible":!flg3
              })}>{wordcard3.chinese}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


