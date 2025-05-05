import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

export const useMutationData = (
  mutationKey: MutationKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  onSuccess?: () => void
) => {
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      if (onSuccess) onSuccess();
      // return toast(data?.status === 200 ? "Success" : "Error");
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  return {
    optimisticUiData: data.map((i) => {
      return { ...i.variables };
    }),
  };

  const latestVariable = data[data.length - 1];
  return { latestVariable };
};
