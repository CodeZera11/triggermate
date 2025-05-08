"use client"

import { onOAuthInstagram } from "@/actions/integrations";
import { onUserInfo } from "@/actions/user";
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query";


const IntegrationsPage = () => {

  // const handleConnectInstagram = async () => {
  //   const res = await fetch("/api/instagram/connect")
  //   const data = await res.json();
  //   if (data.url) {
  //     // on new tab
  //     window.open(data.url, "_blank");
  //   } else {
  //     console.error('Failed to get auth URL:', data.error);
  //   }
  // }

  const onInstaOAuth = async () => onOAuthInstagram();

  const { data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo
  })

  const integrated = data?.data?.integrations?.find((integration) => integration.name === "INSTAGRAM")

  const isIntegrated = integrated?.name === "INSTAGRAM"

  return (
    <div className="p-4">
      <Button
        onClick={onInstaOAuth}
        disabled={isIntegrated}
        className="w-full" variant={isIntegrated ? "default" : "secondary"}
      >
        {isIntegrated ? "Integrated" : "Connect Instagram"}
      </Button>
    </div>
  )
}

export default IntegrationsPage