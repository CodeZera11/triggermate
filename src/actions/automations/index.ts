"use server";

import { onCurrentUser } from "../user";
import { createAutomation, getAutomations } from "./queries";

export const createAutomations = async () => {
  const user = await onCurrentUser();

  try {
    const create = await createAutomation(user.id);
    if (create) return { status: 200, data: "Automation created" };
    return { status: 404, data: "Oops! Something went wrong." };
  } catch (error) {
    console.log("[GET_ALL_AUTOMATIONS]", error);
    return { status: 500, data: "Internal server error" };
  }
};

export const getAllAutomations = async () => {
  const user = await onCurrentUser();

  try {
    const automations = await getAutomations(user.id);
    if (automations) return { status: 200, data: automations };
    return { status: 404, data: [] };
  } catch (error) {
    console.log("[GET_ALL_AUTOMATIONS]", error);
    return { status: 500, data: [] };
  }
};
