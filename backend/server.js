const path = require("path");

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");

const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(cors());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();
  // eslint-disable-next-line no-console
  console.log("MongoDB connected");

  const rawPort = process.env.PORT ?? process.env.port ?? "5000";
  const port = Number.parseInt(String(rawPort).trim(), 10);
  if (!Number.isFinite(port)) throw new Error(`Invalid PORT value: ${rawPort}`);

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });

  const shutdown = () => server.close(() => process.exit(0));
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err.message);
  if (String(err.message).toLowerCase().includes("authentication failed")) {
    // eslint-disable-next-line no-console
    console.error(
      "MongoDB auth failed: verify username/password in MONGOURL and Atlas 'Database Access' user, and ensure your IP is allowed under Atlas 'Network Access'.",
    );
  }
  process.exitCode = 1;
});
