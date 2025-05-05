import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'

const Page = async () => {
  // WIP: Server Action Onboard the user
  // WIP: 200 || 201
  const user = await onBoardUser()
  if (user.status === 200 || user.status === 201) {
    return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}`)
  }


  return redirect('/sign-in')
}

export default Page