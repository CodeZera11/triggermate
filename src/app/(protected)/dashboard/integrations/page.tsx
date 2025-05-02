"use client"

import { Button } from "@/components/ui/button"


const IntegrationsPage = () => {

  const handleConnectInstagram = async () => {
    const res = await fetch("/api/instagram/connect")
    const data = await res.json();
    if (data.url) {
      // on new tab
      window.open(data.url, "_blank");
    } else {
      console.error('Failed to get auth URL:', data.error);
    }
  }

  return (
    <div className="p-4">
      <Button onClick={handleConnectInstagram}>
        Connect Instagram
      </Button>
    </div>
  )
}

export default IntegrationsPage