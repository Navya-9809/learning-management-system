function notFound(req, res, _next) {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
}

function errorHandler(err, _req, res, _next) {
  let statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  let message = err.message || "Server error";

  if (err?.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}`;
  }

  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Not authorized, token invalid";
  }

  if (err?.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err?.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field} already exists`;
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && err.stack ? { stack: err.stack } : {}),
  });
}

module.exports = { notFound, errorHandler };
