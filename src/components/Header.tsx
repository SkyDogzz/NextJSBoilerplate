"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="flex justify-around text-black dark:text-white">
            <Link href="/">
                <h1 className="text-2xl p-4 font-bold">NextJS Boilerplate</h1>
            </Link>
            <nav>
                <ul className="flex items-center justify-center h-full gap-10 text-xl font-semibold">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {status === "authenticated" ? (
                        <li>
                            <button onClick={() => signOut()}>Sign Out</button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href="/login">Sign In</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}