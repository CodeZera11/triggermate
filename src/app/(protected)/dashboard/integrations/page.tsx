"use client"

import { Button } from "@/components/ui/button"


const IntegrationsPage = () => {

  const handleConnectInstagram = async () => {
    const res = await fetch("/api/instagram/connect")
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect the user to the auth URL
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