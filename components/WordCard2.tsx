import { useEffect, useState, FormEvent,KeyboardEvent } from 'react';
import cn from 'classnames';
import Input from 'components/ui/Input';
import Input2 from 'components/ui/Input2';
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Database } from '../types_db';
type WordCardJP = Database['public']['Tables']['wordcardjp']['Row'];

export default function WordCard2() {
  const [wordjp, setWordjp] = useState('');
  const [wordtype, setWordtype] = useState('');
  const [descjp, setDescjp] = useState('');
  const [desc1, setDesc1] = useState('');
  const [desc2, setDesc2] = useState('');
  const supabase = useSupabaseClient<Database>();
  const [words, setWords] = useState<any[]|undefined>([]);
  const [searchword,setSearchword] = useState('');
  const [wordcount, setWordcount] = useState(0);
  const [curpos, setCurpos] = useState(0);

  useEffect(() => {
    fetchWords();
  }, [])

  const fetchWords = async (keyword?:string) => {
    let { data: words, error } = keyword && keyword !== '' ?
                                  // so far the text search only support english
                                  await supabase.from('wordcardjp').select('*').textSearch('desc2', keyword,{type: 'plain',config: 'english'}).order('id', { ascending: true }) :
                                  await supabase.from('wordcardjp').select('*').order('id', { ascending: true });
    if (error) 
      console.log('error', error);
    else{
      setWords(words as any[]|undefined);
      setWordcount(words?.length??0);
    }
      
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // alert(wordjp+wordtype+descjp+desc1+desc2);
    const {
      error,
      data
    } = await supabase.from('wordcardjp').insert({wordjp, type:wordtype, descjp, desc1,desc2 })
    .select('*')
    .single();

    if (error) {
      alert('error happen.')
    } else {
      alert('good job');
      setWordjp('');
      setWordtype('');
      setDescjp('');
      setDesc1('');
      setDesc2('');
    }

    fetchWords();
  }

  const doSearch = (e: KeyboardEvent<HTMLInputElement>) =>{
    //fetchWords();
    if (e.key == 'Enter') {
      fetchWords(searchword);
    }
  }

  return(
    <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="py-4 pl-2 mt-1 bg-white dark:bg-gray-900">
          <Input2 type="text" id="table-search" onChange={setSearchword} onKeyDown={doSearch} className="text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Search for items" />
        </div>
        <div className='my-px border'>
        </div>
        <table className="w-full text-sm text-left text-gray-50e0 dark:text-gray-400 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Japanese Word
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Word Type
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Japanese explanation
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Chinese
                  </th>
                  <th scope="col" className="py-3 px-6">
                    English
                  </th>
              </tr>
          </thead>
          <tbody>
                {words?.map((word) => (
                  <tr key={word.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {word.wordjp}
                    </th>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {word.type === 1?"四字熟語":word.type === 2?"ことわざ":word.type === 3?"故事成語":"慣用語"}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {word.descjp}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {word.desc1}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {word.desc2}
                    </td>
                  </tr>
                ))} 
              </tbody>
        </table>
        <nav className="flex justify-between items-center pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-yellow-200 dark:text-white">{wordcount}</span></span>
        <ul className="inline-flex items-center -space-x-px">
            <li>
                <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
            <li>
                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
                <a href="#" aria-current="page" className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
            <li>
                <a href="#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
            </li>
            <li>
                <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
        </ul>
    </nav>
      </div>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit} className="border">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="wordjp" className="block mb-2 text-sm font-medium text-white">Japanese Word</label>
                <Input type="text" id="wordjp" value={wordjp} onChange={setWordjp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
              </div>  
              <div>
                <label htmlFor="wordtype" className="block mb-2 text-sm font-medium text-white">Select a type</label>
                <select id="wordtype" value={wordtype}  onChange={(e) => {setWordtype(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value="-1">Choose a word type</option>
                  <option value="0">慣用語</option>
                  <option value="1">四字熟語</option>
                  <option value="2">ことわざ</option>
                  <option value="3">故事成語</option>
                </select>
              </div>  
              <div>
                <label htmlFor="descjp" className="block mb-2 text-sm font-medium text-white">Japanese explanation</label>
                <Input type="text" id="descjp" value={descjp}  onChange={setDescjp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
              </div>
              <div>
                <label htmlFor="desc1" className="block mb-2 text-sm font-medium text-white">Chinese</label>
                <Input type="text" id="desc1" value={desc1} onChange={setDesc1}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
              </div>
              <div>
                <label htmlFor="desc2" className="block mb-2 text-sm font-medium text-white">English</label>
                <Input type="text" id="desc2" value={desc2} onChange={setDesc2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required/>
              </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
      </form>
    </div>
  );
}


