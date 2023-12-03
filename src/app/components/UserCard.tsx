import Link from 'next/link';
import styles from './UserCard.module.css';

interface Props {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}

export default function UserCard({ id, name, age, image }: Props) {
  return (
    <div className={styles.card}>
      <p>
        <Link href={`/users/${id}`}>{name}</Link>
      </p>
      <Link href={`/users/${id}`}>
        <img
          src={image ?? '/vercel.svg'}
          alt={`${name}'s profile`}
          className={styles.cardImage}
          referrerPolicy="no-referrer"
        />
      </Link>
      <div className={styles.cardContent}>
        
      </div>
    </div>
  );
}