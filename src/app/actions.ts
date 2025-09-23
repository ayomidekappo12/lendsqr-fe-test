"use server";

import { cookies } from "next/headers";
import { getIronSession, IronSession, SessionOptions } from "iron-session";

// Shape of your session data
export interface SessionData {
  aut: string; // auth token or JWT
  role: string; // e.g. "admin" | "user"
  user: string; // user ID
}

const isProd = process.env.NODE_ENV === "production";

// In-memory fallback (for environments without cookies — useful in dev)
let memorySession: SessionData | null = null;

async function getSession(): Promise<IronSession<SessionData>> {
  try {
    // cookies() is synchronous
    const cookieStore = await cookies();


    const sessionOptions: SessionOptions = {
      password: process.env.SESSION_SECRET ?? "dev-secret-fallback",
      cookieName: "LENDSQR-COOKIE-MONSTER",
      cookieOptions: {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
      },
    };

    // pass directly
    return await getIronSession<SessionData>(cookieStore, sessionOptions);
  } catch (err) {
    console.warn("[Session] Falling back to in-memory session:", err);

    // fallback session (for dev only)
    const fallback: IronSession<SessionData> = {
      aut: memorySession?.aut ?? "",
      role: memorySession?.role ?? "",
      user: memorySession?.user ?? "",
      save() {
        memorySession = { aut: this.aut, role: this.role, user: this.user };
        return Promise.resolve();
      },
      destroy() {
        memorySession = null;
        return Promise.resolve();
      },
      updateConfig() {},
    };

    return fallback;
  }
}

// --- Public helpers ---
export async function getSessionData(): Promise<SessionData | null> {
  const session = await getSession();
  return session.aut && session.role ? { ...session } : null;
}

export async function createSession(
  authToken: string,
  role: string,
  user: string
) {
  const session = await getSession();
  session.aut = authToken;
  session.role = role;
  session.user = user;
  await session.save();
}

export async function deleteSession() {
  const session = await getSession();
  await session.destroy();
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSessionData();
  return !!session?.aut;
}
