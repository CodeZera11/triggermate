"use client"

import CreateAutomation from '@/components/global/create-automation'
import { Button } from '@/components/ui/button'
import { usePaths } from '@/hooks/user-nav'
import { useQueryAutomations } from '@/hooks/user-queries'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'

const AutomationsPage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-5'>
      <div className='lg:col-span-4'>
        <AutomationList />
      </div>

      <div className='lg:col-span-2'>
        <div className="flex  flex-col rounded-xl gap-y-6 p-5 border-[1px] overflow-hidden">
          <div>
            <h2 className='text-xl'>Automations</h2>
            <p className='text-secondary '>
              Your live automations will show here
            </p>
          </div>
          <div className='flex flex-col gap-y-3'>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AutomationList = () => {
  const { pathname } = usePaths();
  const { data } = useQueryAutomations()


  if (data?.status !== 200 || data?.data?.length <= 0) {
    return (
      <div className='h-[70vh] flex justify-center items-center flex-col gap-y-3'>
        <h3 className='text-lg text-gray-400'>
          No automations found
        </h3>
        <CreateAutomation />
      </div>
    )
  }

  console.log({ data })

  return (
    <div className='flex flex-col gap-y-3'>
      {data?.data?.map((automation) => (
        <Link
          key={automation.id}
          href={`${pathname}/${automation?.id}`}>
          <div className='flex flex-col flex-1 items-start'>
            <h2 className='text-xl font-semibold'>
              {automation.name}
            </h2>
            <p className='text-sm mb-2'>
              This is from the comment
            </p>
            {automation?.keywords?.length > 0 ? (
              <div className='flex gap-x-2 flex-wrap mt-3'>
                <div className={cn('rounded-full px-4 py-1 capitalize')}>
                  Get Started
                </div>
              </div>
            ) : (
              <div className='rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1'>
                <p className='text-sm '>No Keywords</p>
              </div>
            )}
          </div>
          <div className='flex flex-col justify-between'>
            <p className='capitalize text-sm font-light'>
              {format(new Date(automation?.createdAt || ""), 'MMMM dd, yyyy')}
            </p>
            {automation?.listener?.listener === "SMARTAI" ? (
              <Button>
                Smart AI
              </Button>
            ) : (
              <Button variant="secondary">
                Standard
              </Button>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AutomationsPage