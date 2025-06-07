"use client";

import { getCompany, logout } from '@/data/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import './Profile.css';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/utils';

function Profile() {
  const router = useRouter()
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getCompany()
  });

  const defaultValues = {
    company_name: profile?.company_name || "",
    email: profile?.email || "",
    phone_number: profile?.phone_number || "",
  }

  const {
    reset,
    handleSubmit,
    register,
    getValues,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    //resolver: zodResolver(profileSchema)
  });


  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['materials'],
    //mutationFn: (data: any) => createMaterial(data),
    onSuccess: () => {
      reset(),
      toast.success('Profile updated successfully'),
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  });

  function onSubmit() {
    const data = getValues()
    //mutate(data)
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  function handleLogout() {
    logout();
    router.push('/auth/signin');
    clearToken();
  }

  return (
    <div className="flex p-4 flex-col justify-center items-center">
      <h2 className="profile-title">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("company_name")}
            value={profile?.company_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            value={profile?.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            {...register("phone_number")}
            value={profile?.phone_number}
          />
        </div>
        <Button variant='destructive' onClick={handleLogout}>
          Logout
        </Button>
      </form>
    </div>
  );
}

export default Profile;