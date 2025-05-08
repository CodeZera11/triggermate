import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { useQueryAutomation } from '@/hooks/use-queries'
import { useMutationData } from '@/hooks/use-mutation-data'
import { activateAutomation } from '@/actions/automations'

type Props = {
  id: string
}

const ActivateAutomationButton = ({ id }: Props) => {

  const { data } = useQueryAutomation(id);
  const { mutate, isPending } = useMutationData(["activate"], (data: { state: boolean }) => activateAutomation(id, data.state), "automation-info");

  return (
    <Button disabled={isPending} onClick={() => mutate({ state: !data?.data?.active })}>
      <Loader state={isPending}>
        <p>
          {data?.data?.active ? "Deactivate" : "Activate"} automation
        </p>
      </Loader>
    </Button>
  )
}

export default ActivateAutomationButton