import { PlusCircle } from "lucide-react";
import { JSX } from "react";
import { v4 } from "uuid";

export type AutomationListener = {
  id: string;
  type: "MESSAGE" | "SMARTAI";
  label: string;
  description: string;
  icon: JSX.Element
}

export const AUTOMATION_LISTENERS: AutomationListener[] = [
  {
    id: v4(),
    label: "Send the user a message",
    icon: <PlusCircle className="w-4 h-4" />,
    description: "Enter the message you want to send the user",
    type: "MESSAGE"
  },
  {
    id: v4(),
    label: "Let Smart AI reply",
    icon: <PlusCircle className="w-4 h-4" />,
    description: "Tell AI what to say. (Upgrade to use this feature)",
    type: "SMARTAI"
  }
]