import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Database } from '../types_db';
type WordCardJP = Database['public']['Tables']['wordcardjp']['Row'];

export default function WordCard({wordcard}: {wordcard:WordCardJP}) {

  const [flg1, setFlag1] = useState(true);
  const [flg2, setFlag2] = useState(true);
  const [flg3, setFlag3] = useState(true);
  const [flg4, setFlag4] = useState(true);

  useEffect(() => {

  }, [wordcard])

  const getTypeName = (wordcard:WordCardJP):string =>{
    let rt = '';
    let type: string = '';

    if(typeof wordcard.type === 'number') {
      type = String(wordcard.type);
    } else {
      type = wordcard.type;
    }

    switch(type) {
      case '1':
        rt = '四字熟語';
        break;
      case '2':
        rt = 'ことわざ';
        break;
      case '3':
        rt = '故事成語';
        break;
      default:
        rt = '慣用語';
    }
    return rt;
  }

  return(
    <div className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
        <div className='rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900'>
          <h2 className="text-2xl leading-6 font-semibold text-white">
            {getTypeName(wordcard)}
          </h2>
          <div className="p-6">
            <div onClick={()=>{
              setFlag1(!flg1);
            }} className="hover:cursor-pointer">
              <h2 className={cn("text-2xl leading-6 font-semibold text-white",
              {
                "invisible":!flg1
              })}>
                {wordcard?.wordjp}
              </h2>
            </div>
            <div onClick={()=>{
              setFlag2(!flg2);
            }} className="hover:cursor-pointer">
              <p className={cn("mt-4 text-zinc-300",
              {
                "invisible":!flg2
              })}>{wordcard?.descjp}</p>
            </div>
            <div onClick={()=>{
              setFlag3(!flg3);
            }} className="hover:cursor-pointer">
              <p className={cn("mt-4 text-zinc-300",
              {
                "invisible":!flg3
              })}>{wordcard?.desc1}</p>
            </div>
            <div onClick={()=>{
              setFlag4(!flg4);
            }} className="hover:cursor-pointer">
              <p className={cn("mt-4 text-zinc-300",
              {
                "invisible":!flg4
              })}>{wordcard?.desc2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


