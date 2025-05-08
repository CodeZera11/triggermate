import {
  getKeywordAutomation,
  matchKeyword,
  trackResponse,
} from "@/actions/webhook/queries";
import { sendDM } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();

  let matcher;

  try {
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }

    if (webhook_payload.entry[0].changes) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].changes[0].value.text
      );
    }

    if (matcher && matcher.automationId) {
      // We have a keyword match
      if (webhook_payload.entry[0].messaging) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          true
        );

        if (automation && automation.triggers?.length > 0) {
          if (
            automation?.listener &&
            automation?.listener?.listener === "MESSAGE"
          ) {
            const igListener = automation?.user?.integrations.find(
              (i) => i.name === "INSTAGRAM"
            );

            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation?.listener.prompt,
              igListener?.token || ""
            );

            if (direct_message.status === 200) {
              const tracked = await trackResponse(automation.id, "DM");
              if (tracked) {
                return NextResponse.json(
                  {
                    message: "Message sent",
                  },
                  { status: 200 }
                );
              }
            }
          }
          if (
            automation?.listener &&
            automation?.listener?.listener === "SMARTAI" &&
            automation?.user?.subscription?.plan === "PRO"
          ) {
            const smart_ai_message = 
          }
        }
      }
    }
  } catch (error) {}
}
