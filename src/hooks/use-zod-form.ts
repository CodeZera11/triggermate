import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: unknown
) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onFormSubmit = handleSubmit(async (data) => mutation({ ...data }));

  return {
    onFormSubmit,
    register,
    errors,
    watch,
    reset,
  };
};

export default useZodForm;
