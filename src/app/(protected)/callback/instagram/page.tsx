import { redirect } from 'next/navigation'
import { onIntegrate } from '@/actions/integrations'

type Props = {
  searchParams: Promise<{
    code: string
  }>
}

const IgCallbackPage = async ({ searchParams }: Props) => {

  const parsedSearchParams = await searchParams;

  const { code } = parsedSearchParams;

  if (code) {
    const user = await onIntegrate(code.split('#_')[0]);

    if (user.status === 200) {
      return redirect(`/dashboard/${user?.data?.firstName}${user?.data?.lastName}/integrations`);
    }
  }

  return redirect('/sign-up')
}

export default IgCallbackPage