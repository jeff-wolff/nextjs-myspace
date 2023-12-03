import { prisma } from '../lib/prisma';
import UserCard from '../components/UserCard';
import styles from './page.module.css';

export default async function Users() {
    const users = await prisma.user.findMany();
    return (
    <>
        <h1 style={{
            marginBottom: '1.5rem',
        }}>Browse Users</h1>
        <div className={styles.grid}>
        {users.map((user) => {
            return <UserCard key={user.id} {...user} />;
        })}
        </div>
    </>
    );

}