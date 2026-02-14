import { NextRequest, NextResponse } from "next/server";

/**
 * Server-side proxy for Salesforce OAuth token exchange.
 * Avoids CORS issues when calling the token endpoint from the browser.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { communityUrl, params } = body as {
    communityUrl: string;
    params: Record<string, string>;
  };

  if (!communityUrl || !params) {
    return NextResponse.json(
      { error: "Missing communityUrl or params" },
      { status: 400 }
    );
  }

  const res = await fetch(`${communityUrl}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
