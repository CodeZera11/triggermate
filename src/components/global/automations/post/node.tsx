import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/use-queries'
import { AlertCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  id: string
}

const PostNode = ({ id }: Props) => {

  const { data } = useQueryAutomation(id);

  if (data?.data && data?.data?.posts?.length > 0) {
    const posts = data?.data?.posts;
    return (
      <div className='w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3'>
        <div className='absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50'>
          <span className='h-[9px] w-[9px] bg-neutral-500/20 rounded-full' />
          <Separator
            orientation='vertical'
            className="bottom-full flex-1 border-[1px] bg-neutral-500/20"
          />
          <span className='h-[9px] w-[9px] bg-neutral-500/20 rounded-full' />
        </div>
        <div className='flex gap-x-2'>
          <AlertCircle />
          If they comment on...
        </div>
        <div className='bg-neutral-500/20 p-3 rounded-xl flex flex-col gap-y-2'>
          <p className='font-bold text-lg'>
            These posts
          </p>
          <div className='flex gap-x-2 flex-wrap mt-3'>
            {posts?.map((post) => (
              <div key={post.id} className='relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden'>
                <Image
                  fill
                  sizes='100vw'
                  src={post.media || ""}
                  alt='post image'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>PostNode</div>
  )
}

export default PostNode