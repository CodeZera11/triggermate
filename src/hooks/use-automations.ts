import { createAutomations } from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";

export const useCreateAutomation = () => {
  const { isPending, mutate } = useMutationData(
    ["create-automation"],
    () => createAutomations(),
    "user-automations"
  );

  return { isPending, mutate };
};
