"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
    targetUserId: string;
    isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isMutating = isFetching || isPending

    const follow = async () => {
        setIsFetching(true);
        const res = await fetch('/api/follow', {
            method: 'POST',
            body: JSON.stringify({ targetUserId }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setIsFetching(false);

        console.log(res);

        startTransition(() => {
            router.refresh();
        });
    }

    const unfollow = async () => {
        setIsFetching(true);
        const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
            method: 'DELETE',
        });
        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
    }

    if (isFollowing) {
        return (
            <button onClick={unfollow} className="follow-button">
                {!isMutating ? 'Remove from Friends' : '...'}
            </button>
        )
    } else {
        return (
            <button onClick={follow} className="follow-button">
                {!isMutating ? 
                <>
                    <Image src={`/add-to-friends.png`} width={29} height={29} alt={``} /> Add to Friends
                </>
                 : '...'}
            </button>
        )
    }

}