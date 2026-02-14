import { SF_CONFIG } from "./config";

/**
 * Generate a cryptographically random code verifier for PKCE.
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

/**
 * Derive the code challenge from a code verifier using SHA-256.
 */
export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(buffer: Uint8Array): string {
  let binary = "";
  for (const byte of buffer) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Build the Salesforce OAuth authorization URL (Authorization Code + PKCE).
 */
export async function getAuthUrl(): Promise<{
  url: string;
  codeVerifier: string;
}> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: SF_CONFIG.clientId,
    redirect_uri: SF_CONFIG.redirectUri,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    scope: "api refresh_token",
  });

  const url = `${SF_CONFIG.communityUrl}/services/oauth2/authorize?${params}`;
  return { url, codeVerifier };
}

/**
 * Exchange an authorization code for access + refresh tokens.
 */
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string
): Promise<TokenResponse> {
  const res = await fetch(
    `${SF_CONFIG.communityUrl}/services/oauth2/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: SF_CONFIG.clientId,
        redirect_uri: SF_CONFIG.redirectUri,
        code,
        code_verifier: codeVerifier,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error_description || "Token exchange failed");
  }

  return res.json();
}

/**
 * Refresh an expired access token.
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse> {
  const res = await fetch(
    `${SF_CONFIG.communityUrl}/services/oauth2/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: SF_CONFIG.clientId,
        refresh_token: refreshToken,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error_description || "Token refresh failed");
  }

  return res.json();
}

/**
 * Fetch the current user's identity info.
 */
export async function getCurrentUser(
  accessToken: string,
  instanceUrl: string
): Promise<SalesforceUser> {
  const res = await fetch(
    `${instanceUrl}/services/oauth2/userinfo`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return res.json();
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
}

export interface SalesforceUser {
  sub: string;
  name: string;
  email: string;
  preferred_username: string;
  nickname: string;
  profile: string;
  picture?: string;
}
