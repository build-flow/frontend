import { createWorker } from '@/data/mutations';
import { getCompanyId } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type props = {
  closeModal: () => void
  shown: boolean
}

const workerSchema = z.object({
  id_number: z.string().min(1, "This field is required!"),
  company_id: z.string().optional(),
  first_name: z.string().min(1, "This field is required!"),
  last_name: z.string().min(1, "This field is required!"),
  phone_number: z.string().min(1, "This field is required!"),
  wage: z.string().min(1, "This field is required!"),
  rate: z.string().min(1, "This field is required!").default('daily')
});

const CreateWorker = ({ closeModal, shown } : props) => {
  const defaultValues = {
    id_number: "",
    company_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    wage: "",
    rate: "daily"
  }

  const { 
    register,
    formState: { isValid, isSubmitting },
    getValues,
    handleSubmit,
    reset
   } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(workerSchema)
  });

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['workers'],
    mutationFn: (data: any) => createWorker(data),
    onSuccess: () => {
      reset(),
      closeModal(),
      queryClient.invalidateQueries({ queryKey: ['workers'] })
      toast.success('Worker saved successfully!')
    },
    onError: (error: any) => {
      toast.error(`${error}`)
    }
  });

  const onSubmit = () => {
    const companyId = getCompanyId()
    const data = getValues()
    data.company_id = companyId
    mutate(data)
  }

  return shown && (
    <div
      onClick={closeModal}
      className='flex justify-center items-center fixed inset-0 z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-md max-h-[90vh] overflow-auto'
      >
        <h2 className='text-xl text-center font-bold py-4'>Add New Worker</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-group">
            <label htmlFor="id_number">ID Number</label>
            <input
              type="text"
              id="id_number"
              {...register('id_number')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="first_name"
              {...register('first_name')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              id="last_name"
              {...register('last_name')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              {...register('phone_number')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="wage">Wage</label>
            <input
              type="text"
              id="wage"
              {...register('wage')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rate">Rate</label>
            <input
              type="text"
              id="rate"
              {...register('rate')}
            />
          </div>
          <div className="modal-buttons">
            <button
              type='submit'
              className="save-btn"
              disabled={!isValid}
            >
              Save
            </button>
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWorker;
