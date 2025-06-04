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
      router.push('/app'),
        setToken(data.access_token)
    }
  });

  const { handleSubmit, getValues, formState: { isSubmitting, isValid }, register } = useForm({
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
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
