import type { NextPage } from 'next'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Profile from '../components/Profile'

export default function ShowProfile() {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <section className="bg-black mb-32">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          ShowProfile
          </h1>
          <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
          <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
              <div className="row">
                <div className="col-6">
                  <h1 className="header">Supabase Auth + Storage</h1>
                  <p className="">
                    Experience our Auth and Storage through a simple profile management example. Create a
                    user profile and upload an avatar image. Fast, simple, secure.
                  </p>
                </div>
                <div className="col-6 auth-widget">
                  <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
                </div>
              </div>
            ) : (
              <>
                <h3>Profile</h3>
                <Profile session={session} />
              </>
            )}
          </div>
          </p>
        </div>
      </div>
      <div className="p-4">
      </div>
    </section>
  );
}