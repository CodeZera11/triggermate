import { Button } from '@/components/ui/button'
import { INTEGRATION_CARDS, IntegrationCardProps } from '@/constants/integrations'
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
  return (
    <div className='border-2 rounded-2xl gap-x-5 p-5 flex items-center'>
      {icon}
      <div className='flex flex-col flex-1'>
        <div className="text-xl">{title}</div>
        <div className="text-base w-full">{description}</div>
      </div>
      <Button>
        Connect
      </Button>
    </div>
  )
}

export default IntegrationsPage