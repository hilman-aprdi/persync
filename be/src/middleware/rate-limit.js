const stores = new Map();

const getStore = (key) => {
  if (!stores.has(key)) {
    stores.set(key, new Map());
  }

  return stores.get(key);
};

const getActorKey = (req) =>
  req.authUser?.id || req.guestId || req.ip || req.headers["x-forwarded-for"] || "anonymous";

export const createRateLimiter = ({
  key,
  windowMs,
  maxRequests,
  message,
  code,
  headline,
  supportingText,
}) => {
  const store = getStore(key);

  return (req, res, next) => {
    const actorKey = String(getActorKey(req));
    const now = Date.now();
    const entry = store.get(actorKey);

    if (!entry || entry.expiresAt <= now) {
      store.set(actorKey, {
        count: 1,
        expiresAt: now + windowMs,
      });
      return next();
    }

    if (entry.count >= maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((entry.expiresAt - now) / 1000));
      res.setHeader("Retry-After", String(retryAfterSeconds));

      const error = new Error(message);
      error.statusCode = 429;
      error.expose = true;
      error.details = {
        code,
        headline,
        supportingText,
        retryAfterSeconds,
      };
      return next(error);
    }

    entry.count += 1;
    return next();
  };
};
