"use client";

import React, { useState } from 'react';
import './Register.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import { handleRegistration } from '@/data/mutations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

const validationSchema = z.object({
  company_name: z.string().min(1, "This field is required"),
  email: z.string().email().min(1, "This field is required"),
  password: z
    .string()
    .min(8, "Password too short")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "This field is required"),
  verified: z.boolean().optional(),
  phone_number: z.string().min(1, "This field is required"),
  bank_account_number: z.string().min(1, "This field is required"),
  bank_number: z.string().min(1, "This field is required"),
  business_code: z.string().min(1, "This field is required"),
  client_id: z.string().optional(),
  client_secret: z.string().optional(),
  api_key: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

function Register() {
  const router = useRouter();

  const defaultFormData = {
    company_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    verified: false,
    phone_number: "",
    bank_account_number: "",
    bank_number: "",
    business_code: "",
    client_id: "",
    client_secret: "",
    api_key: ""
  };

  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { isDirty, isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultFormData,
    resolver: zodResolver(validationSchema)
  });

  type RegisterFormData = z.infer<typeof validationSchema>;

  const { data: userData, mutate } = useMutation<unknown, unknown, RegisterFormData>({
    mutationKey: ['user'],
    mutationFn: (data) => handleRegistration(data),
    onSuccess: (data: any) => {
      router.push('/auth/signin');
      toast.success('Account created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    }
  });

  const onSubmit = () => {
    const { confirmPassword, ...data } = getValues()
    mutate(data)
  }

  return (
    <div className="register">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            {...register("company_name")}
            required
          />
          {errors.company_name && <p className='text-sm text-red-500'>{errors.company_name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Company Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            required
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            {...register("phone_number")}
            required
          />
          {errors.phone_number && <p className='text-sm text-red-500'>{errors.phone_number.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="bank_account_number">Bank Account Number</label>
          <input
            type="text"
            id="bank_account_number"
            {...register("bank_account_number")}
            required
          />
          {errors.bank_account_number && <p className='text-sm text-red-500'>{errors.bank_account_number.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="bank_number">Bank Number</label>
          <input
            type="text"
            id="bank_number"
            {...register("bank_number")}
            required
          />
          {errors.bank_number && <p className='text-sm text-red-500'>{errors.bank_number.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="business_code">Business Code</label>
          <input
            type="text"
            id="business_code"
            {...register("business_code")}
            required
          />
          {errors.business_code && <p className='text-sm text-red-500'>{errors.business_code.message}</p>}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            required
          />
          {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-black text-white font-bold mt-2 disabled:cursor-not-allowed disabled:bg-black/60 cursor-pointer"
          disabled={!isValid}
        >
          Register
        </button>
      </form>
      <div className='my-4 font-medium'>
        <p>Already have an account? <Link href="/auth/signin" className='text-blue-500'>Sign In</Link></p>
      </div>
    </div>
  );
}

export default Register;
