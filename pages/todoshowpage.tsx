import TodoList from "../components/Todos";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


export default function TodoShowPage() {
  const user = useUser();
  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          TodoShowPage
          </h1>
          <p className="mt-5 text-xl text-zinc-500 sm:text-center sm:text-2xl max-w-2xl m-auto">
          {user?(<TodoList user={user} />):(<div>No User</div>)}
          </p>
        </div>
      </div>
      <div className="p-4">
      </div>
    </section>
  );
}
