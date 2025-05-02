import { NextRequest, NextResponse } from "next/server";

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

  const FB_APP_ID = "9581925988559246";
  const FB_APP_SECRET = "83fe32c16d6821f847d01d26d6f38fed";
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
}
