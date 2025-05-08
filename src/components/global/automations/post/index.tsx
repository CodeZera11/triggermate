"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  useAutomationPosts } from "@/hooks/use-automations";
import { useQueryAutomationPosts } from "@/hooks/use-queries";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Loader from "../../loader";

type Props = {
  id: string;
};

export type InstagramPost = {
  id: string;
  media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  media_url: string;
  timestamp: Date;
  caption?: string;
};

const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts();
  const { isPending, mutate, onSelectPost, posts } = useAutomationPosts(id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Attach a post</Button>
      </PopoverTrigger>
      <PopoverContent>
        {data?.status === 200 ? (
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex flex-wrap w-full gap-3">
              {data?.data?.data?.map((post: InstagramPost) => (
                <div
                  className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                  key={post.id}
                  onClick={() =>
                    onSelectPost({
                      postid: post.id,
                      media: post.media_url,
                      mediaType: post.media_type,
                      caption: post.caption,
                    })
                  }
                >
                  {posts?.find((p) => p?.postid === post?.id) && (
                    <CheckCircle fill="white" stroke="black" />
                  )}
                  <Image
                    fill
                    sizes="100vw"
                    src={post.media_url}
                    alt="post image"
                    className={cn(
                      "hover:opacity-75 transition duration-100",
                      posts.find((p) => p.postid === post.id) && "opacity-75",
                    )}
                  />
                </div>
              ))}
            </div>
            <Button onClick={mutate} disabled={posts.length === 0}>
              <Loader state={isPending}>Attach Post</Loader>
            </Button>
          </div>
        ) : (
          <div className="text-secondary-foreground text-center">
            No Posts Found!
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PostButton;
