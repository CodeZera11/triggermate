"use server"

import { redirect } from "next/navigation"

export const onOAuthInstagram = async () => {
  return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
}