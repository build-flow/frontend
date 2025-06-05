import { createProject } from '@/data/mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type CreateProjectProps = {
  close: () => void;
  parentId?: string | null;
  shown: boolean
};

const initialState: z.infer<typeof createProjectSchema> = {
  name: '',
  start_date: '',
  end_date: '',
  completion_date: '',
  completed: false,
  company_id: '',
  parent_id: null,
};

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  completion_date: z.string().optional().or(z.literal("")),
  completed: z.boolean().default(false),
  company_id: z.string().min(1, "Company ID is required"),
  parent_id: z.string().nullable().optional(),
});

const CreateProject = ({ close, shown }: CreateProjectProps) => {
  const {
    reset,
    register,
    formState: { isSubmitting, isValid, errors },
    handleSubmit,
    getValues
  } = useForm<z.infer<typeof createProjectSchema>>({
    mode: "onChange",
    defaultValues: initialState,
    resolver: zodResolver(createProjectSchema)
  });

  const { mutate } = useMutation({
    mutationKey: ['project'],
    mutationFn: (data: any) => createProject(data),
    onSuccess: () => {
      reset();
      toast.success('Project created successfully!');
      close();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error creating project');
    }
  });

  const onSubmit = () => {
    const companyId = localStorage.getItem('companyId')
    const data = getValues();
    data.company_id = companyId
    mutate(data);
  };

  return shown ? (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={close}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] w-full max-w-md max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Create Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              id="name"
              {...register("name")}
              required
            />
            {errors.name && (
              <span className="text-sm text-red-600">{errors.name.message as string}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="start_date">
              Start Date
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="date"
              id="start_date"
              {...register("start_date")}
              required
            />
            {errors.start_date && (
              <span className="text-sm text-red-600">{errors.start_date.message as string}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="end_date">
              End Date
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="date"
              id="end_date"
              {...register("end_date")}
              required
            />
            {errors.end_date && (
              <span className="text-sm text-red-600">{errors.end_date.message as string}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="completion_date">
              Completion Date
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="date"
              id="completion_date"
              {...register("completion_date")}
            />
            {errors.completion_date && (
              <span className="text-sm text-red-600">{errors.completion_date.message as string}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="company_id">
              Company ID
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              id="company_id"
              {...register("company_id")}
              required
            />
            {errors.company_id && (
              <span className="text-sm text-red-600">{errors.company_id.message as string}</span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="parent_id">
              Parent ID
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              type="text"
              id="parent_id"
              {...register("parent_id")}
            />
            {errors.parent_id && (
              <span className="text-sm text-red-600">{errors.parent_id.message as string}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="completed"
              {...register("completed")}
            />
            <label htmlFor="completed" className="font-medium">
              Completed
            </label>
            {errors.completed && (
              <span className="text-sm text-red-600">{errors.completed.message as string}</span>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-60"
              disabled={!isValid}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default CreateProject;
