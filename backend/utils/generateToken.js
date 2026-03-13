const jwt = require("jsonwebtoken");

function generateToken(userId, role) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in environment");

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId, role }, secret, { expiresIn });
}

module.exports = generateToken;

