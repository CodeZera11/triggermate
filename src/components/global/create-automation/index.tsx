"use client"

import Loader from '../loader'
import { Button } from '@/components/ui/button'
import { useCreateAutomation } from '@/hooks/use-automations';
import { useMemo } from 'react';
import { v4 } from 'uuid';


const CreateAutomation = () => {
  const mutationId = useMemo(() => v4(), []);
  const { isPending, mutate } = useCreateAutomation(mutationId);

  return (
    <Button className='lg:px-10 py-6 rounded-full' onClick={() => mutate({ name: "Untitled", id: mutationId, createdAt: new Date() })} >
      <Loader state={isPending}>
        <p className='lg:inline hidden'>Create an Automation</p>
      </Loader>
    </Button>
  )
}

export default CreateAutomation