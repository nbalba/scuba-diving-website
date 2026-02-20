"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  getAuthUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  getCurrentUser,
  type TokenResponse,
  type SalesforceUser,
} from "./auth";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  instanceUrl: string | null;
  user: SalesforceUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "sf_auth";

function loadStoredAuth(): Partial<AuthState> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

function saveAuth(state: Partial<AuthState>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      instanceUrl: state.instanceUrl,
      user: state.user,
    })
  );
}

function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem("sf_code_verifier");
  sessionStorage.removeItem("sf_return_url");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = loadStoredAuth();
    if (stored.accessToken && stored.instanceUrl) {
      return {
        accessToken: stored.accessToken || null,
        refreshToken: stored.refreshToken || null,
        instanceUrl: stored.instanceUrl || null,
        user: (stored.user as SalesforceUser) || null,
        isAuthenticated: true,
        isLoading: false,
      };
    }
    return {
      accessToken: null,
      refreshToken: null,
      instanceUrl: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    };
  });

  const login = useCallback(async () => {
    const { url, codeVerifier } = await getAuthUrl();
    sessionStorage.setItem("sf_code_verifier", codeVerifier);
    sessionStorage.setItem("sf_return_url", window.location.pathname);
    window.location.href = url;
  }, []);

  const handleCallback = useCallback(async (code: string) => {
    const codeVerifier = sessionStorage.getItem("sf_code_verifier");
    if (!codeVerifier) throw new Error("Missing code verifier");

    const tokens: TokenResponse = await exchangeCodeForTokens(
      code,
      codeVerifier
    );

    const user = await getCurrentUser(
      tokens.access_token,
      tokens.instance_url
    );

    const newState: AuthState = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || null,
      instanceUrl: tokens.instance_url,
      user,
      isAuthenticated: true,
      isLoading: false,
    };

    saveAuth(newState);
    setState(newState);
    sessionStorage.removeItem("sf_code_verifier");
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setState({
      accessToken: null,
      refreshToken: null,
      instanceUrl: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  // Auto-refresh token when it expires (on 401 error)
  const refreshSession = useCallback(async () => {
    if (!state.refreshToken) {
      logout();
      return;
    }
    try {
      const tokens = await refreshAccessToken(state.refreshToken);
      const newState: AuthState = {
        ...state,
        accessToken: tokens.access_token,
        instanceUrl: tokens.instance_url,
        isLoading: false,
      };
      saveAuth(newState);
      setState(newState);
    } catch {
      logout();
    }
  }, [state, logout]);

  // Expose refreshSession via context for use by API calls
  void refreshSession;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
