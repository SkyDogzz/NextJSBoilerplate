"use client"
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validationSchemas';
import { z } from 'zod';

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });
    const { data: session, status } = useSession();
    const [error, setFormError] = useState<string>('');

    const onSubmit = async (data: LoginFormData) => {
        setFormError('');

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            });

            if (result && result.error) {
                setFormError(result.error);
                setTimeout(() => setFormError(''), 20000);
                console.error("Failed to sign in!", result.error);
            } else {
                console.log("Logged in successfully!");
                window.location.href = "/";
            }
        } catch (error: any) {
            if (error instanceof Error) {
                setFormError(error.message);
            } else if (error.response && error.response.data) {
                setFormError(error.response.data.error);
            }
            setTimeout(() => setFormError(''), 20000);
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
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md dark:text-white w-3/4 sm:w-2/3 md:w-1/2'>
                {error &&
                    <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Failed to sign in: {error}</span>
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className='p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-700'
                    />
                    {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                </div>
                <button type="submit" className='p-2 bg-blue-500 text-white rounded-md dark:bg-blue-900'>Login</button>
            </form>
        </div>
    );
}