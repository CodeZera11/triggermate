"use client"

import { usePaths } from '@/hooks/user-nav'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const AutomationsPage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-5'>
      <div className='lg:col-span-4'>Automate List</div>
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

  return (
    <div className='flex flex-col gap-y-3'>
      <Link href={`${pathname}/2332132`}>
        <div className='flex flex-col flex-1 items-start'>
          <h2 className='text-xl font-semibold'>
            Automation Name
          </h2>
          <p className='text-sm mb-2'>
            This is from the comment
          </p>
          <div className='flex gap-x-2  flex-wrap mt-3'>
            <div className={cn('rounded-full px-4 py-1 capitalize' )}>
              Get Started
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AutomationsPage