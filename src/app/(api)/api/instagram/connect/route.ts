// app/api/instagram/connect/route.js
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // return NextResponse.json({
    //   url: "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1271886161320483&redirect_uri=https://33b9-103-158-140-15.ngrok-free.app/api/instagram/webhook&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights",
    // });

    const FB_APP_ID = "9581925988559246";
    // const IG_APP_ID = "1271886161320483";
    const REDIRECT_URI = `${
      process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
    }/api/instagram/webhook`;

    // State parameter to prevent CSRF (includes user ID)
    const state = Buffer.from(JSON.stringify({ userId: user.id })).toString(
      "base64"
    );

    // Updated scopes based on latest Graph API v22.0
    const scopes = [
      "instagram_basic",
      "instagram_content_publish",
      "instagram_manage_comments",
      "instagram_manage_insights",
      "pages_show_list",
      "pages_read_engagement",
    ];

    // Construct the Facebook OAuth URL with v22.0

    //   https://www.facebook.com/v22.0/dialog/oauth?
    // client_id={app-id}
    // &redirect_uri={redirect-uri}
    // &state={state-param}

  //   const authUrl = `https://api.instagram.com/oauth/authorize
  // ?client_id=${IG_APP_ID},
  // &redirect_uri=${REDIRECT_URI},
  // &response_type=code,
  // &scope=${scopes.join(",")},
  // &state=${state}`;

    const authUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${scopes.join(",")}&response_type=code&state=${state}`;

    // Redirect to Facebook authorization page
    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Instagram connect error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Instagram" },
      { status: 500 }
    );
  }
}
