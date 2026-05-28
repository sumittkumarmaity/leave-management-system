import { Request, Response, NextFunction } from 'express';
import hpp from 'hpp';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from '../config';

const rateLimiter = new RateLimiterMemory({
  points: config.rateLimit.maxRequests,
  duration: Math.ceil(config.rateLimit.windowMs / 1000)
});

export const securityMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ip = req.ip ?? (req.headers['x-forwarded-for'] as string) ?? 'unknown';
    await rateLimiter.consume(ip);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    hpp()(req, res, next);
  } catch {
    res.status(429).json({ success: false, message: 'Too many requests' });
  }
};
