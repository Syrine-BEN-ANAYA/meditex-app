import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  if (session?.adminAuthenticated) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}
