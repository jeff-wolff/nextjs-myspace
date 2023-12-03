import Link from 'next/link';
import styles from './NavMenu.module.css';
import Image from 'next/image';
import { SignInButton, SignOutButton } from './components/buttons';
import AuthCheck from './components/AuthCheck';

export default function NavMenu() {
  return (
  <>
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          src="/logo.svg"
          width={175}
          height={27}
          alt="NextSpace Logo"
        />
      </Link>
      <ul className={styles.account}>
        <li style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <SignInButton />
        </li>
        <AuthCheck>
          <li>
              <SignOutButton />
          </li>
        </AuthCheck>        
      </ul>
    </nav>
    <div>
      <ul className={styles.links}>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/users'}>Browse</Link>
        </li>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
      </ul>
    </div>
  </>
  );
}