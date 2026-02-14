"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/salesforce/AuthContext";
import { USE_SALESFORCE } from "@/lib/salesforce/config";

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook for fetching data from Salesforce with static fallback.
 *
 * @param sfFetcher  Async function that calls Salesforce (receives accessToken, instanceUrl)
 * @param staticData Static fallback data used when Salesforce is disabled
 */
export function useSalesforceQuery<T>(
  sfFetcher: (accessToken: string, instanceUrl: string) => Promise<T>,
  staticData: T
): QueryResult<T> {
  const { accessToken, instanceUrl, isLoading: authLoading } = useAuth();
  const [state, setState] = useState<QueryResult<T>>({
    data: USE_SALESFORCE ? null : staticData,
    loading: USE_SALESFORCE,
    error: null,
  });

  useEffect(() => {
    if (!USE_SALESFORCE) {
      setState({ data: staticData, loading: false, error: null });
      return;
    }

    if (authLoading) return;

    if (!accessToken || !instanceUrl) {
      // No auth — use static fallback
      setState({ data: staticData, loading: false, error: null });
      return;
    }

    let cancelled = false;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    sfFetcher(accessToken, instanceUrl)
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            data: staticData, // fall back to static on error
            loading: false,
            error: err instanceof Error ? err.message : "Fetch failed",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, instanceUrl, authLoading, sfFetcher, staticData]);

  return state;
}
