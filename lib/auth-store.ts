import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type UserRole = "user" | "editor" | "author" | "moderator" | "admin" | "superadmin";

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  verified: boolean;
  suspended: boolean;
  createdAt: string;
  lastActivity: string;
};

export type UserProfile = {
  userId: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  theme: "dark" | "light";
  preferences: string[];
  readingHistory: string[];
  bookmarks: string[];
};

const usersPath = join(process.cwd(), "data", "users.json");
const profilesPath = join(process.cwd(), "data", "profiles.json");
const ratePath = join(process.cwd(), "data", "auth-rate.json");
const sessionCookie = "aitrending_session";

function ensureFile(path: string, fallback: unknown) {
  const directory = dirname(path);
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });
  if (!existsSync(path)) writeFileSync(path, JSON.stringify(fallback, null, 2), "utf8");
}

function readJson<T>(path: string, fallback: T): T {
  ensureFile(path, fallback);
  try {
    const raw = readFileSync(path, "utf8").replace(/^\uFEFF/, "").trim();
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, data: unknown) {
  ensureFile(path, []);
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}

export function getUsers() {
  return readJson<StoredUser[]>(usersPath, []);
}

export function getProfiles() {
  return readJson<UserProfile[]>(profilesPath, []);
}

export function getProfile(userId: string) {
  return getProfiles().find((profile) => profile.userId === userId);
}

export function getUserByEmail(email: string) {
  return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string) {
  return getUsers().find((user) => user.id === id);
}

export function isAdminRole(role: UserRole) {
  return ["editor", "author", "moderator", "admin", "superadmin"].includes(role);
}

export function checkRateLimit(key: string) {
  const bucket = readJson<Record<string, { count: number; resetAt: number }>>(ratePath, {});
  const now = Date.now();
  const current = bucket[key];
  if (!current || current.resetAt < now) {
    bucket[key] = { count: 1, resetAt: now + 15 * 60 * 1000 };
    writeJson(ratePath, bucket);
    return true;
  }
  if (current.count >= 8) return false;
  current.count += 1;
  writeJson(ratePath, bucket);
  return true;
}

export async function createUser(input: { email: string; password: string; name: string }) {
  const users = getUsers();
  if (getUserByEmail(input.email)) throw new Error("Email already registered.");
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const role: UserRole = users.length === 0 ? "superadmin" : "user";
  const user: StoredUser = {
    id,
    email: input.email.toLowerCase(),
    passwordHash: await bcrypt.hash(input.password, 12),
    role,
    verified: true,
    suspended: false,
    createdAt: now,
    lastActivity: now
  };
  users.push(user);
  writeJson(usersPath, users);

  const profiles = getProfiles();
  profiles.push({
    userId: id,
    name: input.name,
    username: input.email.split("@")[0].replace(/[^a-z0-9_-]/gi, "").toLowerCase(),
    avatar: "",
    bio: "",
    theme: "dark",
    preferences: ["AI Models", "Tools", "Research"],
    readingHistory: [],
    bookmarks: []
  });
  writeJson(profilesPath, profiles);
  return user;
}

export async function verifyPassword(user: StoredUser, password: string) {
  return bcrypt.compare(password, user.passwordHash);
}

function sessionSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "aitrending-local-dev-secret-change-in-production");
}

export async function signSession(user: StoredUser) {
  return new SignJWT({ role: user.role, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(sessionSecret());
}

export async function setSession(user: StoredUser) {
  const token = await signSession(user);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, sessionSecret());
    const id = verified.payload.sub;
    if (!id) return null;
    const user = getUserById(id);
    if (!user || user.suspended) return null;
    return user;
  } catch {
    return null;
  }
}

export function updateProfile(userId: string, patch: Partial<UserProfile>) {
  const profiles = getProfiles();
  const index = profiles.findIndex((profile) => profile.userId === userId);
  if (index === -1) throw new Error("Profile not found.");
  profiles[index] = { ...profiles[index], ...patch, userId };
  writeJson(profilesPath, profiles);
  return profiles[index];
}

export function toggleBookmark(userId: string, itemId: string) {
  const profile = getProfile(userId);
  if (!profile) throw new Error("Profile not found.");
  const exists = profile.bookmarks.includes(itemId);
  const bookmarks = exists ? profile.bookmarks.filter((id) => id !== itemId) : [itemId, ...profile.bookmarks];
  return updateProfile(userId, { bookmarks });
}

export function updateUserRole(userId: string, role: UserRole) {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) throw new Error("User not found.");
  users[index] = { ...users[index], role };
  writeJson(usersPath, users);
  return users[index];
}

export function suspendUser(userId: string, suspended: boolean) {
  const users = getUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) throw new Error("User not found.");
  users[index] = { ...users[index], suspended };
  writeJson(usersPath, users);
  return users[index];
}
