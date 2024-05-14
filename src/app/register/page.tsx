"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '@/lib/validationSchemas';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });
    const [success, setSuccess] = useState(false);
    const [apiErrors, setApiErrors] = useState<string[]>([]);

    const onSubmit = async (data: RegisterFormData) => {
        setApiErrors([]);
        try {
            const res = await axios.post('/api/register', data);
            setSuccess(true);
            reset();
            setTimeout(() => setSuccess(false), 2000);
            console.log('User created successfully', res.data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setApiErrors([error.response.data.error]);
            } else {
                setApiErrors(['An unknown error occurred.']);
            }
            setTimeout(() => setApiErrors([]), 20000);
            console.error('Error creating user', error);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white w-3/4 sm:w-2/3 md:w-1/2'>
                {success &&
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>User created successfully</span>
                    </div>
                }
                {apiErrors.length > 0 &&
                    <div role="alert" className="alert alert-error w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        <div className='flex flex-col w-full'>
                            <p className="mt-1">Failed to create user:</p>
                            <ul>
                                {apiErrors.map((error, index) => (
                                    <li key={index} className="mt-1 list-disc ml-5">{error}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                    {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                </div>
                <button type="submit" className='p-2 bg-blue-500 text-white rounded-md dark:bg-blue-900'>Register</button>
            </form>
        </div>
    );
}