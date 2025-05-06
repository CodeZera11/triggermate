import { useQueryUser } from "@/hooks/use-queries"

type Props = {
  type: "FREE" | "PRO"
  children: React.ReactNode
}

const SubscriptionPlan: React.FC<Props> = ({ children, type }) => {
  const { data } = useQueryUser();

  return data?.data?.subscription?.plan === type && children
}

export default SubscriptionPlan