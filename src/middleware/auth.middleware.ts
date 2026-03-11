import { Request, Response, NextFunction } from "express";

/**
 * Optional auth middleware for protected payment routes.
 * Validates Bearer token against INTERNAL_SERVICE_TOKEN or your auth provider.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = process.env.INTERNAL_SERVICE_TOKEN;

  if (!token) {
    return next();
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization" });
  }

  const bearerToken = authHeader.slice(7);
  if (bearerToken !== token) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};
