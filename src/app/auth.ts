import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from './lib/prisma';

export const config = {
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
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config);