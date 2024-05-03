"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
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
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-gray-200 p-4 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='p-2 border border-gray-300 rounded-md'
                    />
                </div>
                <button type="submit" className='p-2 bg-blue-500 text-white rounded-md'>Register</button>
            </form>
        </div>
    );
}
