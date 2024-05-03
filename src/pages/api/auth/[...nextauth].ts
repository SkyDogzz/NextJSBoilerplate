import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials === undefined) {
                    return null;
                }
                
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user.id, email: user.email };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
});
