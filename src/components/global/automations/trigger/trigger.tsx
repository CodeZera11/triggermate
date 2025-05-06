"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { AUTOMATION_LISTENERS, AUTOMATION_TRIGGERS } from '@/constants/automations'
import { useListener, useTriggers } from '@/hooks/use-automations'
import { useQueryAutomation } from '@/hooks/use-queries'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import SubscriptionPlan from '../../subscription-plan'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import Keywords from './keywords'

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const [types, setTypes] = React.useState<string[]>([]);
  const { isPending, onSaveTrigger } = useTriggers(id, types);
  const { data } = useQueryAutomation(id);

  if (data?.data && data?.data?.triggers?.length > 0) {
    const triggers = data?.data?.triggers;
    const trigger = triggers[0];

    return (
      <div className='flex flex-col gap-y-6 items-center'>
        <ActiveTrigger type={trigger.type} keywords={data?.data?.keywords} />
        {triggers?.length > 1 && (
          <>
            <div className="relative w-6/12 my-4">
              <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>or</p>
              <Separator
                orientation='horizontal'
                className="border-muted border-[1px]"
              />
            </div>
            <ActiveTrigger type={triggers[1].type} keywords={data?.data?.keywords} />
          </>
        )}

        {!data?.data?.listener && (
          <ThenAction id={id} />
        )}
      </div>
    )
  }

  console.log([types])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          Add Trigger
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[400px] bg-[#1D1D1D] shadow-lg flex flex-col gap-y-2')}
        align="end"
        side="bottom"
      >
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div key={trigger.type}>
            <div onClick={() => {
              setTypes((prev) => {
                if (prev.includes(trigger.type)) {
                  return prev.filter((type) => type !== trigger.type);
                } else {
                  return [...prev, trigger.type];
                }
              })
            }} className={cn('bg-background/80', 'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100', types.includes(trigger.type) && 'bg-gradient-to-br from-blue-500 to-red-500')}>
              <div className='flex gap-x-2 items-center'>
                {trigger.icon}
                <p className='text-lg font-semibold'>{trigger.label}</p>
              </div>
              <p className='text-sm text-neutral-500'>{trigger.description}</p>
            </div>
          </div>
        ))}
        <Keywords id={id} />
        <Button onClick={onSaveTrigger} disabled={isPending} className='w-full mt-4'>
          <Loader state={isPending}>
            Add Trigger
          </Loader>
        </Button>
      </PopoverContent>
    </Popover>
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
  id: string;
}

export const ThenAction: React.FC<ThenActionProps> = ({
  id
}) => {
  const {
    onSetListener,
    listener: Listener,
    onFormSubmit,
    register,
    isPending
  } = useListener(id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='p-6 rounded-lg border-dashed border w-full flex items-center justify-center cursor-pointer'>
          <PlusCircle />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[400px] bg-[#1D1D1D] shadow-lg')}
        align="end"
        side="bottom"
      >
        <div className='flex flex-col gap-y-2'>
          {AUTOMATION_LISTENERS.map((listener) => listener.type === "MESSAGE" ?
            <SubscriptionPlan key={listener.type} type='PRO'>
              <div onClick={() => onSetListener(listener.type)} key={listener.id} className={cn(Listener === listener.type ? 'bg-gradient-to-br from-blue-500 to-red-500' : 'bg-background/80', 'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100')}>
                <div className='flex gap-x-2 items-center'>
                  {listener.icon}
                  <p className='text-lg font-semibold'>{listener.label}</p>
                </div>
                <p className='text-sm text-neutral-500'>{listener.description}</p>
              </div>
            </SubscriptionPlan>
            : (
              <SubscriptionPlan key={listener.type} type='FREE'>
                <div onClick={() => onSetListener(listener.type)} key={listener.id} className={cn(Listener === listener.type ? 'bg-gradient-to-br from-blue-500 to-red-500' : 'bg-background/80', 'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100')}>
                  <div className='flex gap-x-2 items-center'>
                    {listener.icon}
                    <p className='text-lg font-semibold'>{listener.label}</p>
                  </div>
                  <p className='text-sm text-neutral-500'>{listener.description}</p>
                </div>
              </SubscriptionPlan>
            ))}
          <form onSubmit={onFormSubmit} className='flex flex-col gap-y-2 mt-4'>
            <Textarea
              placeholder={Listener === "MESSAGE" ? "Enter the message you want to send the user" : "Tell AI what to say"}
              {...register("prompt")}
              className='bg-background/80 outline-none border-none ring-0 focus:ring-0'
            />
            <Input
              placeholder="Add an reply for comments(optional)"
              {...register("reply")}
              className='bg-background/80 outline-none border-none ring-0 focus:ring-0'
            />
            <Button type="submit">
              <Loader state={isPending} >
                Add Listener
              </Loader>
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}




export default Trigger