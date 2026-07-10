const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const usersPath = path.join(dataDir, "users.json");
const profilesPath = path.join(dataDir, "profiles.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const users = fs.existsSync(usersPath) ? JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]") : [];
const profiles = fs.existsSync(profilesPath) ? JSON.parse(fs.readFileSync(profilesPath, "utf8") || "[]") : [];

if (!users.length) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  users.push({
    id,
    email: "admin@aitrending.local",
    passwordHash: bcrypt.hashSync("Admin12345!", 12),
    role: "superadmin",
    verified: true,
    suspended: false,
    createdAt: now,
    lastActivity: now
  });
  profiles.push({
    userId: id,
    name: "AITrending Admin",
    username: "admin",
    avatar: "",
    bio: "Local superadmin for Phase 2 validation.",
    theme: "dark",
    preferences: ["AI Models", "Tools", "Research"],
    readingHistory: [],
    bookmarks: []
  });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2));
  console.log("SEEDED_ADMIN=admin@aitrending.local");
} else {
  console.log("ADMIN_SEED_SKIPPED_USERS_EXIST");
}
