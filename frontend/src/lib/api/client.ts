import type { ApiError } from "@/lib/types/case";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/v1";
const USE_MOCK = (process.env.NEXT_PUBLIC_USE_MOCK_API ?? "true") === "true";

export function isMock() {
  return USE_MOCK;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let body: Partial<ApiError> = {};
    try {
      body = await res.json();
    } catch {
      /* leave empty */
    }
    const err: ApiError = {
      message: body.message ?? res.statusText,
      code: body.code ?? `HTTP_${res.status}`,
      recoverable: body.recoverable ?? res.status < 500,
      details: body.details,
      fieldErrors: body.fieldErrors,
    };
    throw err;
  }
  return (await res.json()) as T;
}
