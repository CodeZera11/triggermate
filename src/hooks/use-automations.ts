import {
  createAutomations,
  deleteKeyword,
  saveKeyword,
  saveListener,
  savePosts,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod-form";

export const useCreateAutomation = (id?: string) => {
  const { isPending, mutate } = useMutationData(
    ["create-automation"],
    () => createAutomations(id),
    "user-automations"
  );

  return { isPending, mutate };
};

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  };
};

export type ListenerType = "MESSAGE" | "SMARTAI";

export const useListener = (id: string) => {
  const [listener, setListener] = useState<ListenerType>("MESSAGE");

  const promptSchema = z.object({
    prompt: z.string().min(1, { message: "Prompt is required" }),
    reply: z.string().min(1, { message: "Reply is required" }),
  });

  const { isPending, mutate } = useMutationData(
    ["create-listener"],
    (data: { prompt: string; reply: string }) =>
      saveListener(id, listener, data.prompt, data.reply),
    "automation-info"
  );

  const onSetListener = (type: "MESSAGE" | "SMARTAI") => setListener(type);

  const formReturns = useZodForm(promptSchema, mutate, {});

  return { ...formReturns, onSetListener, isPending, listener };
};

export type TriggerType = "COMMENT" | "DM";

export const useTriggers = (id: string, types: string[]) => {
  console.log({ types });
  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info"
  );

  const onSaveTrigger = () => mutate({ types });

  return { types, onSaveTrigger, isPending };
};

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState<string>("");

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { mutate } = useMutationData(
    ["add-keyword"],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    "automation-info",
    () => setKeyword("")
  );

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      mutate({ keyword });
      setKeyword("");
    }
  };

  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    () => deleteKeyword(id),
    "automation-info"
  );

  return { keyword, onValueChange, onKeyPress, deleteMutation };
};

export type IgPost = {
  postid: string;
  caption?: string;
  media: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<IgPost[]>([]);

  const onSelectPost = (post: IgPost) => {
    setPosts((prev) => {
      const isPost = prev.find((p) => p.postid === post.postid);
      if (isPost) {
        return prev.filter((p) => p.postid !== post.postid);
      } else {
        return [...prev, post];
      }
    });
  };

  const { mutate, isPending } = useMutationData(
    ["attach-posts"],
    () => savePosts(id, posts),
    "automation-info",
    () => setPosts([])
  );

  return { posts, onSelectPost, mutate, isPending };
};
