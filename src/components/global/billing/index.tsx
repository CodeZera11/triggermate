"use client"

import { Button } from '@/components/ui/button';
import { useQueryUser } from '@/hooks/use-queries'
import { useSubscription } from '@/hooks/use-subscription';
import React from 'react'

const Billing = () => {

  const { data } = useQueryUser();
  const { isProcessing, onSubscribe } = useSubscription();

  console.log({ data })

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
      {/* <PaymentCard
        current={data?.data?.subscription?.plan || "FREE"}
        label="PRO"
      /> */}
      <PaymentCard
        current={data?.data?.subscription?.plan}
        label='Free'
      />
      <Button onClick={onSubscribe} disabled={isProcessing} className='w-full lg:w-1/2 xl:w-1/3'>
        {isProcessing ? "Loading..." : "Subscribe Now"}
      </Button>
    </div>
  )
}

export const PaymentCard = ({ label, current, landing }: { label: string, current?: 'PRO' | 'FREE', landing?: boolean }) => {

  if (!current) return null;

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
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