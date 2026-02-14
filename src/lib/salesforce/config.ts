export const SF_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_SF_CLIENT_ID || "",
  communityUrl: process.env.NEXT_PUBLIC_SF_COMMUNITY_URL || "",
  apiVersion: process.env.NEXT_PUBLIC_SF_API_VERSION || "v60.0",
  redirectUri: process.env.NEXT_PUBLIC_SF_REDIRECT_URI || "http://localhost:3000/auth/callback",
} as const;

export const USE_SALESFORCE =
  process.env.NEXT_PUBLIC_USE_SALESFORCE === "true";

/** Build the Salesforce REST API base URL from the community URL */
export function getApiBaseUrl(instanceUrl: string): string {
  return `${instanceUrl}/services/data/${SF_CONFIG.apiVersion}`;
}
