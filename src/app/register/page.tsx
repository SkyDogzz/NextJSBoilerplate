"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/register', { email, name, password });
            console.log('User created successfully', res.data);
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                </div>
                <button type="submit" className='p-2 bg-blue-500 text-white rounded-md dark:bg-blue-900'>Register</button>
            </form>
        </div>
    );
}
