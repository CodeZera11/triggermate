import { getAutomationInfo } from '@/actions/automations';
import { PrefetchUserAutomation } from '@/react-query/prefetch';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react'

export async function generateMetadat({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const info = await getAutomationInfo(id);

  return {
    title: info?.data?.name,
  }
}

const AutomationPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const query = new QueryClient();

  await PrefetchUserAutomation(query, id);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>AutomationPage</div>
    </HydrationBoundary>
  )
}

export default AutomationPage