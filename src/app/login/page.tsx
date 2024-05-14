"use client"
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { loginSchema } from '@/lib/validationSchemas';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { data: session, status } = useSession();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');

        try {
            loginSchema.parse({ email, password });

            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            });

            if (result && result.error) {
                setError(result.error);
                const interval = setInterval(() => {
                    setError('');
                    clearInterval(interval);
                }, 20000);
                console.error("Failed to sign in!", result.error);
            } else {
                console.log("Logged in successfully!");
                window.location.href = "/";
            }
        } catch (error: any) {
            if (error instanceof Error) {
                setError(error.message);
            } else if (error.response && error.response.data) {
                setError(error.response.data.error);
            }
            const interval = setInterval(() => {
                setError('');
                clearInterval(interval);
            }, 20000);
            console.error('Error logging in', error);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            window.location.href = "/";
        }
    }, [status, session]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleLogin} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white w-3/4 sm:w-2/3 md:w-1/2'>
                {error &&
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Failed to sign in: email or password incorrect</span>
                    </div>
                }
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
