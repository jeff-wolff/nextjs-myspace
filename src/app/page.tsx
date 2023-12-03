// import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link'
import styles from './page.module.css'

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect('/api/auth/signin');
    return (
    
      <div>
        <h1>Welcome to NextSpace!</h1>
        <p>
          A next-gen social media app to connect with friends inspired by MySpace
        </p>
        <p>To get started, <Link href="/api/auth/signin">sign up</Link> for an account</p>
      </div>
      
    )
  } else {
    return (
      <div>
        <h1>Welcome to NextSpace!</h1>
        <p>
          A next-gen social media app to connect with friends inspired by MySpace
        </p>
        <p>To get started, <Link href="/dashboard">create a profile</Link></p>
      </div>
    )
  }


}
