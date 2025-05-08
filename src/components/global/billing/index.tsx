"use client"

import { useQueryUser } from '@/hooks/use-queries'
import React from 'react'

const Billing = () => {

  const { data } = useQueryUser();

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
      <PaymentCard
        current={data?.data?.subscription?.plan}
        label='Free'
      />
    </div>
  )
}

export const PaymentCard = ({ label, current, landing }: { label: string, current?: 'PRO' | 'FREE', landing?: boolean }) => {

  if (!current) return null;

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>

      Your current plan is: {current}

      {landing ? (
        <h2 className='text-2xl'>
          {label === "PRO" && "Premium Plan"}
          {label === "FREE" && "Standard"}
        </h2>
      ) : (
        <h2 className='text-2xl'>
          {label === current ? "Your Current Plan" : current === "PRO" ? "Downgrade" : "Upgrade"}
        </h2>
      )}
    </div>
  )
}


export default Billing