import { onBoardUser } from '@/actions/user'
import React from 'react'


const Page = async () => {
  // WIP: Server Action Onboard the user
  // WIP: 200 || 201
  const user = await onBoardUser()

  return (
    <div>Page</div>
  )
}

export default Page