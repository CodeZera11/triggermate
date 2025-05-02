import React from 'react'

const SettingsPage = () => {
  return <Billing />
}

export const Billing = () => {
  // WIP: Fetch billing info

  return (
    <div className='flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container'>
      <PaymentCard current='FREE' label='Free' />
      <PaymentCard current='PRO' label='Pro' />
    </div>
  )
}


export const PaymentCard = ({ label, current, landing }: { label: string, current: 'PRO' | 'FREE', landing?: boolean }) => {
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

export default SettingsPage;