"use client"

import { onOAuthInstagram } from '@/actions/integrations'
import { onUserInfo } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { INTEGRATION_CARDS, IntegrationCardProps } from '@/constants/integrations'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const IntegrationsPage = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-full lg:w-8/12 gap-y-5'>
        {INTEGRATION_CARDS.map((card) => <IntegrationCard key={card.title} {...card} />)}
      </div>
    </div>
  )
}

export const IntegrationCard = ({ title, description, icon }: IntegrationCardProps) => {

  const onInstaOAuth = async () => onOAuthInstagram();

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo
  })

  const integrated = data?.data?.integrations?.find((integration) => integration.name === "INSTAGRAM")

  const isInstaIntegrated = integrated?.name === "INSTAGRAM"

  return (
    <div className='border-2 rounded-2xl gap-x-5 p-5 flex items-center'>
      {icon}
      <div className='flex flex-col flex-1'>
        <div className="text-xl">{title}</div>
        <div className="text-base w-full">{description}</div>
      </div>
      <Button
        onClick={onInstaOAuth}
        disabled={isInstaIntegrated}
        variant={isInstaIntegrated ? "secondary" : "default"}
      >
        {isInstaIntegrated ? "Connected" : "Connect"}
      </Button>
    </div>
  )
}

export default IntegrationsPage