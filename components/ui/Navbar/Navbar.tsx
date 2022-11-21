import Link from 'next/link';
import s from './Navbar.module.css';

import Logo from 'components/icons/Logo';
import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
              <Link href="/account">
                <a className={s.link}>Account</a>
              </Link>
              <Link href="/zuststoretest1">
                <a className={s.link}>ZustStore1</a>
              </Link>
              <Link href="/zuststoretest2">
                <a className={s.link}>ZustStore2</a>
              </Link>
              <Link href="/dashboardofteacher">
                <a className={s.link}>DashboardOfTeacher</a>
              </Link>
              <Link href="/todoshowpage">
                <a className={s.link}>TodoShowPage</a>
              </Link>
              <Link href="/showprofile">
                <a className={s.link}>ShowProfile</a>
              </Link>
              <Link href="/cardtest1">
                <a className={s.link}>CardTest1</a>
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <span
                className={s.link}
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  router.push('/signin');
                }}
              >
                Sign out
              </span>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
