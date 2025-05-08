import { InstagramIcon } from "lucide-react"

export type IntegrationCardProps = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: "INSTAGRAM"
}

export const INTEGRATION_CARDS: IntegrationCardProps[] = [
  {
    title: "Connect Instagram",
    description: "Connect your Instagram account to get started.",
    icon: <InstagramIcon />,
    strategy: "INSTAGRAM",
  }
]