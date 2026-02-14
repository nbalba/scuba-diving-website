import { getApiBaseUrl } from "./config";

export interface SfRecord {
  Id: string;
  attributes?: { type: string; url: string };
  [key: string]: unknown;
}

export interface SfQueryResult<T = SfRecord> {
  totalSize: number;
  done: boolean;
  records: T[];
}

async function sfFetch(
  url: string,
  accessToken: string,
  init?: RequestInit
): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Salesforce API error (${res.status}): ${body}`);
  }

  return res;
}

/**
 * Run a SOQL query and return typed records.
 */
export async function sfQuery<T = SfRecord>(
  soql: string,
  accessToken: string,
  instanceUrl: string
): Promise<SfQueryResult<T>> {
  const base = getApiBaseUrl(instanceUrl);
  const res = await sfFetch(
    `${base}/query?q=${encodeURIComponent(soql)}`,
    accessToken
  );
  return res.json();
}

/**
 * Create a new record. Returns the created record's Id.
 */
export async function sfCreate(
  objectName: string,
  data: Record<string, unknown>,
  accessToken: string,
  instanceUrl: string
): Promise<{ id: string; success: boolean }> {
  const base = getApiBaseUrl(instanceUrl);
  const res = await sfFetch(
    `${base}/sobjects/${objectName}`,
    accessToken,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

/**
 * Update an existing record by Id.
 */
export async function sfUpdate(
  objectName: string,
  id: string,
  data: Record<string, unknown>,
  accessToken: string,
  instanceUrl: string
): Promise<void> {
  const base = getApiBaseUrl(instanceUrl);
  await sfFetch(
    `${base}/sobjects/${objectName}/${id}`,
    accessToken,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    }
  );
}

/**
 * Delete a record by Id.
 */
export async function sfDelete(
  objectName: string,
  id: string,
  accessToken: string,
  instanceUrl: string
): Promise<void> {
  const base = getApiBaseUrl(instanceUrl);
  await sfFetch(
    `${base}/sobjects/${objectName}/${id}`,
    accessToken,
    { method: "DELETE" }
  );
}
