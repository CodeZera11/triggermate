"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { useCreateAutomation } from '@/hooks/use-automations';


const CreateAutomation = () => {
  const { isPending, mutate } = useCreateAutomation();

  return (
    <Button className='lg:px-10 py-6 rounded-full' onClick={() => mutate()} >
      <Loader state={isPending}>
        <p className='lg:inline hidden'>Create an Automation</p>
      </Loader>
    </Button>
  )
}

export default CreateAutomation