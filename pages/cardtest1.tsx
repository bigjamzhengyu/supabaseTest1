import cn from 'classnames';
import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Database } from '../types_db';
import WordCard from '../components/WordCard';
type WordCardJP = Database['public']['Tables']['wordcardjp']['Row'];

export default function CardTest1() {

  const supabase = useSupabaseClient<Database>();
  const [wordCardJPs, setwordCardJPs] = useState<any[]|undefined>([]);

  useEffect(() => {
    fetchWordCardJP()
  }, [])
  
  const fetchWordCardJP = async () => {
    let { data: words, error } = await supabase.from('wordcardjp').select('*').order('id', { ascending: true });
    if (error) 
      console.log('error', error);
    else 
    setwordCardJPs(words as any[]|undefined);
  }

  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          CardTest1
          </h1>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
            {wordCardJPs?.map((word) => (
              <WordCard key={word.id} wordcard={word} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
      </div>
    </section>
  );
}
