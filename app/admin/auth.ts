import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "longtrack_admin";

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookieName)?.value;

  if (!session || !getSessionSecret()) {
    return false;
  }

  return safeEqual(session, createSessionToken());
}

export async function setAdminSession() {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set.");
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function isValidPassword(password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  return safeEqual(hash(password), hash(expectedPassword));
}

function createSessionToken() {
  const secret = getSessionSecret();

  if (!secret) {
    return "";
  }

  return createHmac("sha256", secret).update("longtrack-admin").digest("hex");
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
