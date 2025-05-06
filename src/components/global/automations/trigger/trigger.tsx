"use client"

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/hooks/user-queries'
import React from 'react'

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {

  const { data } = useQueryAutomation(id);

  // if (data?.data && data?.data?.triggers?.length > 0) {
  // const triggers = data?.data?.triggers;
  // const trigger = triggers[0];

  return (
    <div className='flex flex-col gap-y-6 items-center'>
      <ActiveTrigger type={"COMMENT"} keywords={[{
        id: "1",
        word: "test",
        automationId: null
      }]} />
      {/* Trigger > 1 */}
      <>
        <div className="relative w-6/12 my-4">
          <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>or</p>
          <Separator
            orientation='horizontal'
            className="border-muted border-[1px]"
          />
        </div>
        <ActiveTrigger type={"MESSAGE"} keywords={[{
          id: "1",
          word: "test",
          automationId: null
        }]} />
      </>

      <ThenAction />
    </div>
  )
  // }


  return (
    <div>Trigger</div>
  )
}

interface ActiveTriggerProps {
  type: string;
  keywords: {
    id: string;
    word: string;
    automationId: string | null
  }[]
}

const ActiveTrigger: React.FC<ActiveTriggerProps> = ({ keywords, type }) => {
  return <div className='bg-neutral-600/10 p-3 rounded-xl w-full'>
    <div className='flex gap-x-2 '>
      <p className='text-lg'>
        {type === "COMMENT" ? "User Comments on my post" : "User Sends me a direct message"}
      </p>
    </div>
    <p className="text-neutral-500">
      {type === "COMMENT" ? 'If the user comments on a video that is setup to listen for keywords, this automation will fire' : 'If the user sends you a message that contains a keyword, this automation will fire'}
    </p>
    <div className="flex gap-2 mt-5 flex-wrap">
      {keywords.map((keyword) => (
        <div key={keyword.id} className='bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full'>
          <p className=''>
            {keyword.word}
          </p>
        </div>
      ))}
    </div>
  </div>
}

type ThenActionProps = {
  id: string
}

export const ThenAction: React.FC<ThenActionProps> = ({ id }) => {
  const {} = useListener(id);
  return (
    <div></div>
  )
}


export default Trigger