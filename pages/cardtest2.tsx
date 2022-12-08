import cn from 'classnames';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { Database } from '../types_db';
import WordCard3 from '../components/WordCard3';
type DataBase3000 = Database['public']['Tables']['database3000']['Row'];
type Wordlist = Database['public']['Tables']['wordlist']['Row'];

export default function CardTest2() {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const [wordCards, setwordCards] = useState<any[]|undefined>([]);
  const [mod, setMod] = useState(0);

  useEffect(() => {
    fetchWordCard3();
  }, [])
  
  const fetchWordCard3 = async () => {
    let { data: words, error } = await supabase.from('database3000').select('*').order('id', { ascending: true });
    if (error) 
      console.log('error', error);
    else 
    setwordCards(words as any[]|undefined);
  }

  const changeMod = async () => {
    if (!session?.user){
      return;
    }
    if(mod === 0) {
      setMod(1);
      let { data: words, error } = await supabase.from('database3000').select('*, wordlist(*)')
      .order('id', { ascending: true });
      if (error) 
        console.log('error', error);
      else {
        const list = [];
        for(const word in words as Array<object>){
          console.log(word);
        }
        //setwordCards(words as any[]|undefined);
      }
    } else {
      setMod(0);
      fetchWordCard3();
    }
  }

  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          CardTest2
          </h1>
          <div><button type="button" onClick={()=>{changeMod()}} className="bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-900">{mod}</button></div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
            {wordCards?.map((word) => (
              <WordCard3 key={word.id} wordcard3={word} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
      </div>
    </section>
  );
}
