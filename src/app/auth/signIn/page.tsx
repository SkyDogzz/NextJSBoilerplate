"use client"
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function SignInPage() {
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
        <form onSubmit={handleLogin}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
