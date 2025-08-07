const ratemap = new Map();
const rateLimiteMiddleware = (req, res, next) => {
  let ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const windowMs = 10 * 1000;
  const maxRequests = 2;
  if (!ratemap.has(ip)) {
    ratemap.set(ip, []);
  }
  const timestamps = ratemap.get(ip).filter((ts) => now - ts < windowMs);
  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      message: "Too Many Request -- Slow Down",
    });
  }
  timestamps.push(now);
  ratemap.set(ip, timestamps);
  next();
};
module.exports = rateLimiteMiddleware;
