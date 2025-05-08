"use client";

import { Separator } from "@/components/ui/separator";
import { useQueryAutomation } from "@/hooks/use-queries";
import { CircleAlert } from "lucide-react";
import React from "react";
import PostButton from "../post";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);

  const commentTrigger = data?.data?.triggers.find((t) => t.type === "COMMENT");

  if (!data?.data?.listener) {
    return <div></div>;
  }

  const listener = data?.data?.listener;
  const posts = data?.data?.posts;

  return (
    <div className="w-full lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-neutral-500/20 rounded-full" />
        <Separator
          orientation="vertical"
          className="bottom-full flex-1 border-[1px] bg-neutral-500/20"
        />
        <span className="h-[9px] w-[9px] bg-neutral-500/20 rounded-full" />
      </div>
      <div className="flex gap-x-2">
        <CircleAlert />
        Then...
      </div>
      <div className="bg-neutral-500/40 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          {listener?.listener}
          <p className="text-lg">
            {listener?.listener === "MESSAGE"
              ? "Send the user a message."
              : "Let Smart AI take over."}
          </p>
        </div>
        <p className="font-light text-secondary-foreground">
          {listener?.prompt}
        </p>
      </div>
      {posts?.length > 0 ? (
        <></>
      ) : commentTrigger ? (
        <PostButton id={id} />
      ) : (
        <> </>
      )}
    </div>
  );
};

export default ThenNode;
