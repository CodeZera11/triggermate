import { Input } from "@/components/ui/input";
import { useKeywords } from "@/hooks/use-automations";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryAutomation } from "@/hooks/use-queries";
import { X } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: string
}

const Keywords = ({ id }: Props) => {

  const { deleteMutation, keyword, onKeyPress, onValueChange } = useKeywords(id);

  const { latestVariable } = useMutationDataState(['add-keyword']);

  const { data } = useQueryAutomation(id);

  return (
    <div
      className="flex flex-col gap-y-3 p-3 rounded-xl"
    >
      <p className="text-sm text-neutral-500">
        Add words that trigger automations
      </p>
      <div className="flex flex-wrap justify-start gap-2 items-center">
        {data?.data?.keywords && data?.data?.keywords?.length > 0 && data?.data?.keywords?.map((word) => {
          if (word?.id !== latestVariable?.variables?.id) {
            return (
              <div key={word.id} className="flex gap-x-2 items-center capitalize text-neutral-400 py-1 px-4 rounded-full">
                <p>
                  {word.word}
                </p>
                <X
                  size={20}
                  onClick={() => deleteMutation({ id: word.id }, {
                    onSuccess: () => {
                      toast.success("Keyword deleted successfully");
                    }
                  })}
                  className="text-neutral-500 cursor-pointer"
                />
              </div>
            )
          }
        })}
        {latestVariable && latestVariable?.status === "pending" && (
          <div className="flex items-center gap-x-2 capitalize py-1 px-4 rounded-full">
            {latestVariable?.variables?.keyword}
          </div>
        )}
        <Input
          placeholder="Add keyword..."
          value={keyword}
          style={{
            width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch'
          }}
          className="p-0 bg-transparent ring-0 border-none outline-none"
          onChange={onValueChange}
          onKeyUp={onKeyPress}
        />
      </div>
    </div>
  )
}

export default Keywords