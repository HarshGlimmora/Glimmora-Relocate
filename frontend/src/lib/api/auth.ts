import { apiFetch, isMock } from "./client";
import type {
  IdentityFormValues,
  CredentialsFormValues,
  LoginFormValues,
  ResumeMeta,
} from "@/lib/schemas/auth";
import type { AuthUser } from "@/lib/state/auth-store";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function mockUser(identity: IdentityFormValues): AuthUser {
  return {
    userId: `U-${Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, "0")}`,
    fullName: identity.fullName,
    email: identity.email,
    phone: identity.phone,
    accountStatus: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function registerAccount(
  identity: IdentityFormValues,
  credentials: CredentialsFormValues
): Promise<AuthUser> {
  if (isMock()) {
    await delay(420);
    return mockUser(identity);
  }
  return apiFetch<AuthUser>(`/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      fullName: identity.fullName,
      email: identity.email,
      phone: identity.phone,
      password: credentials.password,
    }),
  });
}

export async function login(values: LoginFormValues): Promise<AuthUser> {
  if (isMock()) {
    await delay(320);
    return mockUser({ fullName: "Returning user", email: values.email, phone: "+1 (555) 010-0000" });
  }
  return apiFetch<AuthUser>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export async function uploadResume(file: File): Promise<ResumeMeta> {
  if (isMock()) {
    await delay(600);
    return {
      name: file.name,
      sizeBytes: file.size,
      type: file.type || "application/octet-stream",
      uploadedAt: new Date().toISOString(),
    };
  }
  const form = new FormData();
  form.append("file", file);
  // apiFetch assumes JSON, so go direct for multipart:
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const res = await fetch(`${base}/auth/resume`, {
    method: "POST",
    body: form,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resume upload failed (${res.status})`);
  return (await res.json()) as ResumeMeta;
}
