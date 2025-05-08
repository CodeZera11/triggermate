// app/api/instagram/connect/route.js
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      url: "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1271886161320483&redirect_uri=https://b377-103-158-140-15.ngrok-free.app/api/callback/instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights",
    });

    const appId = "9581925988559246";
    const redirectUri = `http://localhost:3000/api/instagram/webhook`;
    const scopes = "pages_show_list,instagram_basic";
    const responseType = "code";
    const state = Buffer.from(JSON.stringify({ userId: user.id })).toString(
      "base64"
    );

    const authUrl = `https://www.facebook.com/v22.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes}&response_type=${responseType}&state=${state}`;

    return NextResponse.json({
      url: authUrl,
    });
  } catch (error) {
    console.error("Instagram connect error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Instagram" },
      { status: 500 }
    );
  }
}
