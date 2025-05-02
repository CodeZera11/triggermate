import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  const insta_form = new FormData();

  insta_form.append("client_id", "1271886161320483");
  insta_form.append("client_secret", "3c386085da0a5cb21243f7ad42bddbde");
  insta_form.append("grant_type", "authorization_code");
  insta_form.append(
    "redirect_uri",
    "https://b377-103-158-140-15.ngrok-free.app/api/callback/instagram"
  );
  insta_form.append("code", code as string);
  const INSTAGRAM_BASE_URL = "https://graph.instagram.com/v22.0";

  const shortTokenRes = await fetch(
    "https://graph.instagram.com/access_token",
    {
      method: "POST",
      body: insta_form,
    }
  );

  const token = await shortTokenRes.json();
  console.log({ token });

  if (token?.permissions?.length > 0) {
    console.log(token, "got permissions");
    const longTokenRes = await fetch(
      `${INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=3c386085da0a5cb21243f7ad42bddbde&access_token=${token.access_token}`,
      {
        method: "GET",
      }
    );

    const longToken = await longTokenRes.json();
    console.log(longToken, "got long token");

    if (longToken) {
      const res = await fetch(
        `${INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${longToken.data.access_token}`,
        {
          method: "GET",
        }
      );

      const instaId = await res.json();
      console.log(instaId, "got insta id");
    }
  }

  return NextResponse.json({
    success: true,
  });
}
