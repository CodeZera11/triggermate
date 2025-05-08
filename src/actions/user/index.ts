"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/lib/fetch";
import { updateIntegration } from "../integrations/queries";
import { stripe } from "@/app/(protected)/api/payment/route";

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

          if (days < 5) {
            console.log("refresh");
            const refresh = await refreshToken(integrations[0]?.token);

            const today = new Date();
            const expire_date = today.setDate(today.getDate() + 60);
            const update_token = await updateIntegration({
              token: refresh.access_token,
              expire: new Date(expire_date),
              id: integrations[0]?.id,
            });

            if (!update_token) {
              console.log("Update token failed");
            }
          }
        }
      }
      return {
        status: 200,
        data: {
          firstname: found.firstName,
          lastname: found.lastName,
        },
      };
    }
    const created = await createUser({
      clerkId: user.id,
      firstName: user.firstName!,
      email: user?.emailAddresses[0]?.emailAddress,
      lastName: user.lastName!,
    });

    return {
      status: 201,
      data: {
        firstname: created.firstName,
        lastname: created.lastName,
      },
    };
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

export const onUserInfo = async () => {
  const user = await onCurrentUser();

  try {
    const profile = await findUser(user.id);
    if (profile) return { status: 200, data: profile };

    return { status: 404 };
  } catch (error) {
    console.log("[ONUSERINFO]", error);
    return { status: 500 };
  }
};

export const onSubscribe = async (session_id: string) => {
  const clerkUser = await onCurrentUser();

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session) {
      const subscribed = await updateSubscription(clerkUser.id, {
        customerId: session.customer as string,
        plan: "PRO",
      });
      if (subscribed) {
        return { status: 200 };
      }

      return { status: 401 };
    }
  } catch (error) {
    console.log("[ONSUBSCRIBE]", error);
    return { status: 500 };
  }
};
