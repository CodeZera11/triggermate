import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'


const CreateAutomation = () => {
  return (
    <Button className='lg:px-10 py-6 rounded-full' >
      <Loader state={false}>
        <p className='lg:inline hidden'>Create an Automation</p>
      </Loader>
    </Button>
  )
}

export default CreateAutomation