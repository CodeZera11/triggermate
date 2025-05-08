import { findAutomation } from "@/actions/automations/queries";
import {
  createChatHistory,
  getChatHistory,
  getKeywordAutomation,
  getKeywordPost,
  matchKeyword,
  trackResponse,
} from "@/actions/webhook/queries";
import { sendDM } from "@/lib/fetch";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function GET(req: NextRequest) {
  const hub = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(hub);
}

export async function POST(req: NextRequest) {
  const webhook_payload = await req.json();

  let matcher;

  try {
    // Check if it is DM
    if (webhook_payload.entry[0].messaging) {
      matcher = await matchKeyword(
        webhook_payload.entry[0].messaging[0].message.text
      );
    }

    // Check if it is comment
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
            const igIntegration = automation?.user?.integrations.find(
              (i) => i.name === "INSTAGRAM"
            );

            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              automation?.listener.prompt,
              igIntegration?.token || ""
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
            const smart_ai_message = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "assistant",
                  content: `${automation?.listener?.prompt}: Keep responses under 2 sentences`,
                },
              ],
            });

            if (smart_ai_message?.choices[0]?.message?.content) {
              await createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                webhook_payload.entry[0].messaging[0].message.text
              );

              await createChatHistory(
                automation.id,
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content
              );

              const igIntegration = automation?.user?.integrations?.find(
                (i) => i.name === "INSTAGRAM"
              );

              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].messaging[0].sender.id,
                smart_ai_message.choices[0].message.content,
                igIntegration?.token || ""
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
          }
        }
      }

      if (
        webhook_payload.entry[0].changes &&
        webhook_payload.entry[0].changes[0].field === "comments"
      ) {
        const automation = await getKeywordAutomation(
          matcher.automationId,
          false
        );

        const automations_post = await getKeywordPost(
          webhook_payload.entry[0].changes[0].value.media.id,
          automation?.id || ""
        );

        if (automation && automations_post && automation?.triggers) {
          const igIntegration = automation?.user?.integrations.find(
            (i) => i.name === "INSTAGRAM"
          );

          if (automation.listener) {
            if (automation.listener.listener === "MESSAGE") {
              const direct_message = await sendDM(
                webhook_payload.entry[0].id,
                webhook_payload.entry[0].changes[0].value.from.id,
                automation?.listener?.prompt,
                igIntegration?.token || ""
              );

              if (direct_message.status === 200) {
                const tracked = await trackResponse(automation.id, "COMMENT");

                if (tracked) {
                  return NextResponse.json(
                    {
                      message: "Message Sent",
                    },
                    { status: 200 }
                  );
                }
              }
            }

            if (
              automation.listener.listener === "SMARTAI" &&
              automation.user.subscription?.plan === "PRO"
            ) {
              const smart_ai_message = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "assistant",
                    content: `${automation.listener.prompt}: keep responses under 2 sentences`,
                  },
                ],
              });

              if (smart_ai_message.choices[0].message.content) {
                // TODO: Implement Transaction Here

                await createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  webhook_payload.entry[0].changes[0].value.text
                );

                await createChatHistory(
                  automation.id,
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content
                );

                const direct_message = await sendDM(
                  webhook_payload.entry[0].id,
                  webhook_payload.entry[0].changes[0].value.from.id,
                  smart_ai_message.choices[0].message.content,
                  igIntegration?.token || ""
                );

                if (direct_message.status === 200) {
                  const tracked = await trackResponse(automation.id, "COMMENT");

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
            }
          }
        }
      }
    }

    if (!matcher) {
      const customer_history = await getChatHistory(
        webhook_payload.entry[0].messaging[0].recipient.id,
        webhook_payload.entry[0].messaging[0].sender.id
      );

      if (customer_history?.history?.length > 0) {
        const automation = await findAutomation(
          customer_history?.automationId as string
        );

        if (
          automation?.user?.subscription?.plan === "PRO" &&
          automation?.listener?.listener === "SMARTAI"
        ) {
          const smart_ai_message = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              {
                role: "assistant",
                content: `${automation?.listener?.prompt}: keep responses under 2 sentences`,
              },
              ...customer_history?.history.map((h) => ({
                role:
                  h.senderId === webhook_payload.entry[0].messaging[0].sender.id
                    ? ("user" as ChatCompletionUserMessageParam["role"])
                    : ("assistant" as ChatCompletionUserMessageParam["role"]),
                content: h.message || "",
              })),
              {
                role: "user",
                content: webhook_payload.entry[0].messaging[0].message.text,
              },
            ],
          });

          if (smart_ai_message.choices[0].message.content) {
            await createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              webhook_payload.entry[0].messaging[0].message.text
            );
            await createChatHistory(
              automation.id,
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content
            );

            const igIntegration = automation?.user?.integrations.find(
              (i) => i.name === "INSTAGRAM"
            );

            const direct_message = await sendDM(
              webhook_payload.entry[0].id,
              webhook_payload.entry[0].messaging[0].sender.id,
              smart_ai_message.choices[0].message.content,
              igIntegration?.token || ""
            );

            if (direct_message.status === 200) {
              return NextResponse.json(
                {
                  message: "Message sent",
                },
                { status: 200 }
              );

              // const tracked = await trackResponse(automation.id, "DM");

              // if (tracked) {
              //   return NextResponse.json(
              //     {
              //       message: "Message sent",
              //     },
              //     { status: 200 }
              //   );
              // }
            }
          }
        }
      }
    }

    return NextResponse.json(
      {
        message: "No Automation set",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error in Instagram webhook:", error);
    return NextResponse.json(
      {
        message: "Error processing request",
      },
      { status: 500 }
    );
  }
}
