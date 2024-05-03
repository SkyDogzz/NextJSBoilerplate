"use client"
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { data: session, status } = useSession();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result && result.error) {
            console.error("Failed to sign in!", result.error);
        } else {
            console.log("Logged in successfully!");
            window.location.href = "/";
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            window.location.href = "/";
        }
    }, [status, session]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                </div>
                <button type="submit" className='p-2 bg-blue-500 text-white rounded-md dark:bg-blue-900'>Register</button>
            </form>
        </div>
    )
}
