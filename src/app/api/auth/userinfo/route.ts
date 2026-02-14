import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy for Salesforce userinfo endpoint.
 * Avoids CORS issues when calling from the browser.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { instanceUrl, accessToken } = body as {
    instanceUrl: string;
    accessToken: string;
  };

  if (!instanceUrl || !accessToken) {
    return NextResponse.json(
      { error: "Missing instanceUrl or accessToken" },
      { status: 400 }
    );
  }

  const res = await fetch(`${instanceUrl}/services/oauth2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
