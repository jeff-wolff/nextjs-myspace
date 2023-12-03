import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { prisma } from '../../lib/prisma';
import { Metadata } from 'next';
import FollowButton from '../../components/FollowButton/FollowButton';
import UserCard from '../../components/UserCard';
import styles from './page.module.css'

interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfile({ params }: Props) {
    const session = await getServerSession(authOptions);
    let hideFollowButton;
    if (session) {
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            }
        });
        hideFollowButton = currentUser?.id === params.id;
    } else {
        hideFollowButton = false;
    }

    // Fetch the follower count
    const followerCount = await prisma.follows.count({
        where: {
            followingId: params.id,
        }
    });


    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
        }
    });

    // Fetch 8 random followers
    const randomFollowers = await prisma.follows.findMany({
        where: {
            followingId: params.id,
        },
        take: 8,
        orderBy: {
            followerId: 'desc',
        },
        include: {
            follower: true,
        }
    });

    const { name, bio, image, age } = user ?? {};

    const sanitizedBio = bio ? bio.replace(/<script.*?>.*?<\/script>/gi, '') : '';

    return (
        <div className={styles.profileWrap}>
            <div className={styles.profileLeft}>
                <h1 className={styles.profileName}>{name}</h1>

                <img 
                    src={image ?? '/vercel.svg'} 
                    width={170} 
                    height={138} 
                    alt={`${name}'s profile`} 
                    style={{
                        objectFit: 'cover',
                    }}
                />

                {age ?
                <p style={{
                    marginTop: '.75rem',
                }}>{age} years old</p>
                 : null}
                             
                {hideFollowButton ? null :
                <div>
                    <FollowButton targetUserId={params.id} />
                </div> 
                }
            </div>
            <div className={styles.profileRight}>
                <div className="rte">            
                    <h3><strong className="primary-color">{name}'s Blurbs</strong></h3>        
                    {bio ?                
                    <>
                        <p style={{ marginBottom: '0px'}} >
                            <strong className="primary-color">About Me:</strong>
                        </p>
                        <p
                         dangerouslySetInnerHTML={{ __html: sanitizedBio }}                          
                        />
                    </>
                        : 
                        <p>{name} has not written a bio yet.</p>
                    }            
                </div>
                {/* Friend Space Section */}
                <div className={styles.friendSpace}>
                    <div className="rte">
                        <h3><strong className="primary-color">{name}'s Friend Space</strong></h3>
                        <p><strong>{name} has <span className="highlight-color">{followerCount}</span> Friends.</strong></p>
                    </div>
                    <div className={styles.friendList}>
                        {randomFollowers.map((follow) => (
                            <UserCard
                                key={follow.followerId}
                                id={follow.follower.id}
                                name={follow.follower.name}
                                age={follow.follower.age}
                                image={follow.follower.image}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
        );
    }
