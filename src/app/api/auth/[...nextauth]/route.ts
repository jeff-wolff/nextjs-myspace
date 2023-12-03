import { prisma } from '../../../lib/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    events: {
        signIn: async ({ user, isNewUser }) => {
            if (isNewUser) {
                const tomUser = await prisma.user.findUnique({
                    where: {
                        email: 'peoplereviewstuff@gmail.com', // This is Tom's email
                    },
                });
                if (tomUser && tomUser.id !== user.id) {
                    await prisma.follows.create({
                        data: {
                            followerId: user.id,
                            followingId: tomUser.id,
                        },
                    });
                    
                    await prisma.follows.create({
                        data: {
                            followerId: tomUser.id,
                            followingId: user.id,
                        },
                    });
                }
            }
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };