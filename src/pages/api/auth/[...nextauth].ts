import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { loginSchema } from "@/lib/validationSchemas";
import { ZodError } from "zod";

const prisma = new PrismaClient();

interface User {
    id: string;
    email: string;
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req: any): Promise<User | null> {
                if (credentials === undefined) {
                    return null;
                }

                try {
                    loginSchema.parse(credentials);
                } catch (error) {
                    console.error("Validation failed", error);
                    if (error instanceof ZodError) {
                        return null;
                    } else {
                        return null;
                    }
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });
                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user.id.toString(), email: user.email } as User;
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
        signIn: "/login",
    }
});
