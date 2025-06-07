import { createMaterial } from '@/data/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type props = {
  closeModal: () => void
  shown: boolean
  projectId: string
}

const materialSchema = z.object({
  name: z.string().min(1, 'This field is required!'),
  price: z.string().min(1, 'This field is required!'),
  quantity: z.string().min(1, 'This field is required!'),
  total: z.string().min(1, 'This field is required!'),
  date_purchased: z.string().min(1, 'This field is required!'),
  project_id: z.string().optional()
});

const CreateMaterial = ({ closeModal, shown, projectId } : props) => {
  const defaultValues = {
    name: "",
    price: "",
    quantity: "",
    total: "",
    date_purchased: new Date().toISOString().split('T')[0],
    project_id: ""
  };

  const {
    reset,
    handleSubmit,
    register,
    getValues,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(materialSchema)
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ['materials'],
    mutationFn: (data: any) => createMaterial(data),
    onSuccess: () => {
      reset(),
      closeModal(),
      toast.success('Material created successfully'),
      queryClient.invalidateQueries({ queryKey: ['materials'] })
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  });

  function onSubmit() {
    const data = getValues()
    data.project_id = projectId
    mutate(data)
  }

  return shown && (
    <div
      className='flex justify-center items-center fixed inset-0 z-50'
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-md max-h-[90vh] overflow-auto'
      >
        <h2 className='py-2 text-xl font-bold'>Add New Material</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Material Name</label>
            <input
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Unit Price</label>
            <input
              type="number"
              id="unitPrice"
              {...register("price")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitPrice">Date Purchased</label>
            <input
              type="date"
              id="date_purchased"
              {...register("date_purchased")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalCost">Total Cost</label>
            <input
              type="number"
              id="totalCost"
              {...register("total")}
            />
          </div>
          <div className="modal-buttons">
            <button type='submit' className="save-btn">
              Save
            </button>
            <button disabled={!isValid} className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMaterial;
