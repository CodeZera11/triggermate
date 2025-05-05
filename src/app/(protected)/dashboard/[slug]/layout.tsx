import Navbar from "@/components/global/navbar"
import Sidebar from "@/components/global/sidebar"
import { PrefetchUserAutomations, PrefetchUserProfile } from "@/react-query/prefetch"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: Props) => {
  const slug = (await params).slug;

  const queryClient = new QueryClient();

  await PrefetchUserProfile(queryClient);
  await PrefetchUserAutomations(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='p-3'>
        <Navbar slug={slug} />
        <Sidebar slug={slug} />
        <div className="lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout