import { Express, Request, Response, NextFunction } from 'express';

// Extend Express Request type to have proper typing
declare global {
  namespace Express {
    interface RequestHandler {
      (req: Request, res: Response, next: NextFunction): any;
    }
  }
} 