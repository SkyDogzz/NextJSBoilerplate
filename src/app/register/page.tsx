"use client"
import React, { useState } from 'react';
import axios from 'axios';

interface Error {
    error: {
        response: {
            data: {
                message: string;
            };
        };
    }
}

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post('/api/register', { email, name, password });
            setSuccess(true);
            const interval = setInterval(() => {
                setSuccess(false);
                clearInterval(interval);
            }, 2000);
            console.log('User created successfully', res.data);
        } catch (error: any) {
            setErrors(error.response.data.error)
            const interval = setInterval(() => {
                setErrors([]);
                clearInterval(interval);
            }, 20000);
            console.error('Error creating user', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white w-3/4 sm:w-2/3 md:w-1/2'>
                {success &&
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>User created successfully</span>
                    </div>
                }
                {errors.length > 0 &&
                    <div role="alert" className="alert alert-error w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        <div className='flex flex-col w-full'>
                            <p className="mt-1">Failed to create user:</p>
                            <ul>
                                {errors.map((error: any, index: number) => (
                                    <li key={index} className="mt-1 list-disc ml-5">{error.message}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
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
