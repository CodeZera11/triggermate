import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription';

const PaymentButton = () => {
  // WIP: get their subscription details
  // WIP: Loading state

  const { isProcessing, onSubscribe } = useSubscription();

  return (
    <Button disabled={isProcessing} onClick={onSubscribe} className='bg-gradient-to-br text-white rounded-full from-[#9685DB] via-[#9434E6] font-bold to-[#CC3BD4]'>
      {isProcessing ? "Loading..." : "Subscribe"}
    </Button>
  )
}

export default PaymentButton