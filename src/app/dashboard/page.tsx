import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { prisma } from '../lib/prisma';
import { redirect } from 'next/navigation';

import { authOptions } from '../api/auth/[...nextauth]/route';
import { ProfileForm } from './ProfileForm';

import styles from './page.module.css'

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session){
    redirect('/api/auth/signin')
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  
  
  return (
    <>
      <div className={styles.profileHeader}>
        <div>
          <h1 className={styles.profileTitle}>Profile Edit</h1>
        </div>
      
          <div>
            <p
              style={{
                textAlign: 'right',
                marginBottom: '0',
              }}
            >
              {user && <Link href={`/users/${user.id}`}>View My Profile</Link>}
            </p>
          </div>
        </div>
        
        <ProfileForm user={user} />
    </>
  );
}