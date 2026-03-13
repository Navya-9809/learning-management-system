const ApiError = require("../utils/apiError");

function adminMiddleware(req, _res, next) {
  if (!req.user) throw new ApiError(401, "Not authorized");
  if (req.user.role !== "admin") throw new ApiError(403, "Admin access required");
  next();
}

module.exports = adminMiddleware;

