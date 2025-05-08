import { getAutomationInfo } from "@/actions/automations";
import ActivateAutomationButton from "@/components/global/active-automation-button";
import PostNode from "@/components/global/automations/post/node";
import ThenNode from "@/components/global/automations/then/node";
import Trigger from "@/components/global/automations/trigger/trigger";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export async function generateMetadat({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const info = await getAutomationInfo(id);

  return {
    title: info?.data?.name,
  };
}

const AutomationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const query = new QueryClient();

  await PrefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <div className="w-full lg:w-10/12 xl:6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">When...</div>
          <Trigger id={id} />
        </div>
        <ThenNode id={id} />
        <PostNode id={id} />
        <ActivateAutomationButton id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default AutomationPage;
