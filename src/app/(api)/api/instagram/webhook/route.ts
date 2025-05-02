import { NextRequest, NextResponse } from "next/server";

// Webhook verification for setup
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const aT = request.nextUrl.searchParams.get("access_token");

  console.log("AT:", aT);

  if (!code || !state) {
    return NextResponse.json(
      { error: "Missing code or state parameter" },
      { status: 400 }
    );
  }

  // Exchange the code for an access token
  const FB_APP_ID = "9581925988559246"; // Replace with your Facebook App ID
  const FB_APP_SECRET = "83fe32c16d6821f847d01d26d6f38fed"; // Add your App Secret to environment variables
  const REDIRECT_URI = `${
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  }/api/instagram/webhook`;

  const authUrl = `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&client_secret=${FB_APP_SECRET}&code=${code}`;

  const tokenResponse = await fetch(authUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error("Error fetching access token:", tokenData);
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }

  console.log("Access token response:", tokenData);
  // const userFields = "id,username,account_type,name";
  const accessToken = tokenData.access_token;
  console.log("Access token:", accessToken);

  const decodedState = JSON.parse(
    Buffer.from(state, "base64").toString("utf-8")
  );
  console.log("Decoded state:", decodedState);

  const accounts = await fetch(
    `https://graph.facebook.com/v22.0/me/accounts?access_token=${accessToken}`
  );

  const accountsData = await accounts.json();
  console.log("Accounts data:", accountsData);
  const pageId = accountsData.data[0].id;
  console.log({ pageId });

  const igAccountRes = await fetch(
    `https://graph.facebook.com/v22.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
  );

  const igData = await igAccountRes.json();
  console.log("Instagram Business Account ID:", igData);

  return NextResponse.json({ sucess: true, accountsData, igData });

  // // Use the access token to fetch Instagram user data (optional)
  // const userResponse = await fetch(`https://graph.instagram.com/v22.0/me
  // ?fields=${userFields}
  // &access_token=${accessToken}`);

  // const userData = await userResponse.json();

  // if (!userResponse.ok) {
  //   console.error("Error fetching Instagram user data:", userData);
  //   return NextResponse.json(
  //     { error: "Failed to fetch Instagram user data" },
  //     { status: 500 }
  //   );
  // }

  // console.log("Instagram user data:", userData);

  // // Return the user data or save it to your database
  // return NextResponse.json({ user: userData });

  // http://localhost:3000/api/instagram/webhook?code=AQClShNcaEDwQjYWzG4mf3p7MZulS3ILutjsp8Fdf3_vUI9rQQfDilt6G32-vN9kqyqrLIYiuT-TGJXZREyZYJ0LHRwMtufIPxgxEidsQ4q8xitl65D8H5erMUutO4VqtSc_oyGE-ZYBJXSvVcUWm9rNVAveF_jpyabZbKnwUDVYVWf3KfSL3oBMElt4sXkvLLeuy9eD1hVylhXvXZ0Z-llKgGxnes3DMcUAMitgV-np2aIUVbkytPr_pMNv8hpwY81pvem0kMN1XZFhTErm5nXBC0lqeik0srKFEV7FGu9zxcsaT4q1l0gMBHsiC7Hx-Reb97_UpL5lgGrHZ4dQIUbbWkROcFStgGL0uVw9WN_0KZ89bGDC3yLf1yGh4gIWHbM&state=eyJ1c2VySWQiOiJ1c2VyXzJ3UmhWNHpNWWdQYm1YRTNIdXAycUppVWpoTyJ9#_=_

  // return NextResponse.json({
  //   success: true,
  // });

  // const mode = url.searchParams.get("hub.mode");
  // const token = url.searchParams.get("hub.verify_token");
  // console.log({ token, mode });
  // const challenge = url.searchParams.get("hub.challenge");

  // // Verify webhook
  // if (
  //   mode === "subscribe"
  //   // &&
  //   // token === "testing"
  // ) {
  //   console.log("Webhook verified");
  //   return new NextResponse(challenge);
  // } else {
  //   return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  // }
}

// Handle webhook events
export async function POST(request: NextRequest) {
  // try {
  const webhook_payload = await request.json();
  console.log("Webhook payload:", webhook_payload);

  // try {
  //   if(webhook_payload)
  // } catch (error) {

  // }

  //   // Log the entire webhook body for debugging
  //   console.log("Webhook event received:", JSON.stringify(body, null, 2));

  //   // Instagram sends an array of "entry" objects
  //   const entries = body.entry || [];

  //   for (const entry of entries) {
  //     // Handle Comments
  //     if (entry.changes && entry.changes.length > 0) {
  //       for (const change of entry.changes) {
  //         if (change.field === "instagram_comments") {
  //           // await handleInstagramComment(change.value);
  //           console.log("Instagram comment event:", change.value);
  //         } else if (change.field === "instagram_direct_messages") {
  //           // await handleInstagramDirectMessage(change.value);
  //           console.log("Instagram DM event:", change.value);
  //         }
  //       }
  //     }
  //   }

  //   return NextResponse.json({ success: true });
  // } catch (error) {
  //   console.error("Webhook handler error:", error);
  //   return NextResponse.json(
  //     { error: "Webhook processing failed" },
  //     { status: 500 }
  //   );
  // }
}

// Handle Instagram comment events
// async function handleInstagramComment(value: any) {
//   try {
//     const { comment_id, text, from } = value;

//     if (!comment_id || !from) {
//       console.log('Skipping comment due to missing data', value);
//       return;
//     }

//     // Find the Instagram account in our database
//     const account = await db.query.instagramAccounts.findFirst({
//       where: eq(instagramAccounts.instagramId, value.media.owner.id)
//     });

//     if (!account) {
//       console.log('Instagram account not found in database', value.media.owner.id);
//       return;
//     }

//     // Generate AI response using OpenAI
//     const aiResponse = await generateAIResponse('comment', text);

//     // Reply to the comment
//     await replyToComment(comment_id, aiResponse, account.accessToken);

//     console.log(`Replied to comment: ${comment_id}`);
//   } catch (error) {
//     console.error('Error handling Instagram comment:', error);
//   }
// }

// // Handle Instagram DM events
// async function handleInstagramDirectMessage(value) {
//   try {
//     const { thread_id, message_id, text, from, created_time } = value;

//     if (!message_id || !from) {
//       console.log('Skipping DM due to missing data', value);
//       return;
//     }

//     // Find the Instagram account in our database
//     const account = await db.query.instagramAccounts.findFirst({
//       where: eq(instagramAccounts.instagramId, value.recipient.id)
//     });

//     if (!account) {
//       console.log('Instagram account not found in database', value.recipient.id);
//       return;
//     }

//     // Generate AI response using OpenAI
//     const aiResponse = await generateAIResponse('dm', text);

//     // Send a DM reply
//     await sendDirectMessageReply(thread_id, aiResponse, account.accessToken);

//     console.log(`Replied to DM in thread: ${thread_id}`);
//   } catch (error) {
//     console.error('Error handling Instagram DM:', error);
//   }
// }

// // Generate AI response using OpenAI
// async function generateAIResponse(type, text) {
//   try {
//     // Different system prompts based on message type
//     const systemPrompt = type === 'comment'
//       ? "You are a helpful assistant responding to Instagram comments. Keep responses friendly, helpful, and concise (max 300 characters)."
//       : "You are a helpful assistant responding to Instagram direct messages. Be conversational, helpful, and keep responses under 1000 characters.";

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: `Please respond to this Instagram ${type}: "${text}"` }
//       ],
//       max_tokens: type === 'comment' ? 100 : 400,
//       temperature: 0.7,
//     });

//     return completion.choices[0].message.content;
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     return type === 'comment'
//       ? "Thanks for your comment! We'll get back to you soon."
//       : "Thanks for your message! Our team will respond shortly.";
//   }
// }

// // Send reply to Instagram comment
// async function replyToComment(commentId, replyText, accessToken) {
//   try {
//     const response = await fetch(`https://graph.facebook.com/v22.0/${commentId}/replies`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: replyText,
//         access_token: accessToken,
//       }),
//     });

//     const result = await response.json();

//     if (result.error) {
//       throw new Error(JSON.stringify(result.error));
//     }

//     return result;
//   } catch (error) {
//     console.error('Error replying to comment:', error);
//     throw error;
//   }
// }

// // Send direct message reply
// async function sendDirectMessageReply(threadId, messageText, accessToken) {
//   try {
//     const response = await fetch(`https://graph.facebook.com/v22.0/${threadId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         message: messageText,
//         access_token: accessToken,
//       }),
//     });

//     const result = await response.json();

//     if (result.error) {
//       throw new Error(JSON.stringify(result.error));
//     }

//     return result;
//   } catch (error) {
//     console.error('Error sending DM reply:', error);
//     throw error;
//   }
// }
