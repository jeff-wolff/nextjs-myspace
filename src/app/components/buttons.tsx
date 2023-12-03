'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function SignInButton() {
    const { data: session, status }  = useSession();
    console.log(session, status);

    if ( status === 'loading') {
        return <>...</>;
    }
    if (status === 'authenticated') {
        return (
            <Link href={`/dashboard`} className="dashboard-link button-link">
                <Image
                    src={session.user?.image ?? '/vercel.svg'}
                    width={24}
                    height={24}
                    alt="Profile"
                    style={{
                        objectFit: 'cover',
                        marginRight: '0.5rem',
                    }}
                />     
                My Account       
            </Link>
        );
    }

    return <button onClick={() => signIn()} className="button-link">Sign In</button>;
}

export function SignOutButton() {
    return <button onClick={() => signOut()} className="button-link">Sign Out</button>;
}