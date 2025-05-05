"use server";

import { onCurrentUser, onUserInfo } from "../user";
import {
  createAutomation,
  findAutomation,
  getAutomations,
  updateAutomation,
} from "./queries";

export const createAutomations = async (id?: string) => {
  const user = await onUserInfo();

  if (!user || !user?.data) {
    return { status: 404, data: "User not found" };
  }

  try {
    const create = await createAutomation(user.data.id, id);
    if (create) return { status: 200, data: "Automation created" };
    return { status: 404, data: "Oops! Something went wrong." };
  } catch (error) {
    console.log("[GET_ALL_AUTOMATIONS]", error);
    return { status: 500, data: "Internal server error" };
  }
};

export const getAllAutomations = async () => {
  const user = await onUserInfo();

  if (!user || !user?.data) {
    return { status: 404, data: [] };
  }

  try {
    const automations = await getAutomations(user.data.id);
    if (automations) return { status: 200, data: automations };
    return { status: 404, data: [] };
  } catch (error) {
    console.log("[GET_ALL_AUTOMATIONS]", error);
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();

  try {
    const automation = await findAutomation(id);

    if (automation) {
      return { status: 200, data: automation };
    }

    return { status: 404 };
  } catch (error) {
    console.log("[GET_AUTOMATION_INFO]", error);
    return { status: 500 };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: { name?: string; active?: boolean; automation?: string }
) => {
  await onCurrentUser();

  try {
    const update = await updateAutomation(automationId, data);

    if(update) {
      return { status: 200, data: "Automation updated" };
    }
    return { status: 404, data: "Oops! Could not find automation." };

  } catch (error) {
    console.log("[UPDATE_AUTOMATION_NAME]", error);
    return { status: 500, data: "Oops! Internal server error" };
  }
};
