"use client";

import React, { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/data/mutations';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { toast } from 'sonner';

const validationSchema = z.object({
  email: z.string().email().min(1, "This field is required!"),
  password: z.string().min(1, "This field is required!")
});

function Login() {
  const router = useRouter();
  const { mutate, data: userData } = useMutation({
    mutationKey: ['user'],
    mutationFn: (data: any) => login(data),
    onSuccess: (data: any) => {
      setToken(data.access_token);
      localStorage.setItem('companyId', data.company.id);
      toast.success("Login Successful!");
      router.push('/app');
    },
    onError: (error: any) => {
    toast.error(error.message || 'Login failed');
  }
  });

  const { 
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid, errors },
    register
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(validationSchema)
  });

  function onSubmit() {
    const data = getValues();
    mutate(data)
  }

  return (
    <div className="login">
      <h2 className="login-title">Log In</h2>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="companyEmail">Company Email</label>
          <input
            type="email"
            id="companyEmail"
            {...register("email")}
            required
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            required
          />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-black text-white font-bold mt-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-black/60"
          disabled={!isValid}
        >
          Log In
        </button>
      </form>
      <div className='my-4 font-medium'>
        <p>Don't have an account? <Link href="/auth/signup" className='text-blue-500'>Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
