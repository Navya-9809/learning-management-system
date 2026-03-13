const path = require("path");

const dotenv = require("dotenv");

const { connectDB } = require("../config/db");
const User = require("../models/User");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

async function main() {
  const name = process.env.ADMIN_NAME || "Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env to seed an admin");
  }

  await connectDB();

  const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    // eslint-disable-next-line no-console
    console.log("Admin already exists:", existing.email);
    return;
  }

  const admin = await User.create({
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    password: String(password),
    role: "admin",
  });

  // eslint-disable-next-line no-console
  console.log("Admin created:", admin.email);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Seed failed:", err.message);
  process.exitCode = 1;
});

