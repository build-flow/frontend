"use client";

import React, { useState } from 'react';
import './Register.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import { handleRegistration } from '@/data/mutations';
import { useRouter } from 'next/navigation';

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
  client_id: z.string().min(1, "This field is required"),
  client_secret: z.string().min(1, "This field is required"),
  api_key: z.string().min(1, "This field is required")
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
    formState: { isDirty, isSubmitting, isValid }
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
      router.push('/auth/login');
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
        </div>
        <div className="form-group">
          <label htmlFor="email">Company Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            id="phone_number"
            {...register("phone_number")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bank_account_number">Bank Account Number</label>
          <input
            type="text"
            id="bank_account_number"
            {...register("bank_account_number")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bank_number">Bank Number</label>
          <input
            type="text"
            id="bank_number"
            {...register("bank_number")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="business_code">Business Code</label>
          <input
            type="text"
            id="business_code"
            {...register("business_code")}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
