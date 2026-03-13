const mongoose = require("mongoose");

function getMongoUri() {
  return (
    process.env.MONGOURL ||
    process.env.MONGO_URL ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URI
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function connectDB() {
  const mongoUri = getMongoUri()?.trim();
  if (!mongoUri) {
    throw new Error(
      "Missing MongoDB connection string. Set MONGOURL (or MONGODB_URI) in backend/.env",
    );
  }

  mongoose.set("strictQuery", true);

  const maxRetries = Number.parseInt(process.env.MONGO_RETRY_COUNT || "5", 10);
  const baseDelayMs = Number.parseInt(process.env.MONGO_RETRY_DELAY_MS || "500", 10);

  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
      return;
    } catch (err) {
      lastError = err;
      const isLast = attempt === maxRetries;
      if (isLast) break;

      const delay = Math.min(10_000, baseDelayMs * Math.pow(2, attempt));
      // eslint-disable-next-line no-console
      console.warn(
        `Mongo connect failed (attempt ${attempt + 1}/${maxRetries + 1}): ${err.message}. Retrying in ${delay}ms...`,
      );
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay);
    }
  }

  throw lastError;
}

module.exports = { connectDB };
