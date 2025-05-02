"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { findUser } from "./queries";

export const onCurrentUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return user;
};

export const onBoardUser = async () => {
  const user = await onCurrentUser();

  try {
    const found = await findUser(user.id);

    if (found) {
      const integrations = found.integrations;
      if (integrations.length > 0) {
        const today = new Date();

        const integrationTime = integrations[0]?.expiresAt?.getTime();

        if (integrationTime) {
          const timeLeft = integrationTime - today.getTime();
          const days = Math.round(timeLeft / (1000 * 60 * 60 * 24));

          if(days < 5) {
            console.log("refresh")
            // const refresh = await 
          }
        }
      }
    }
  } catch (error) {}
};
