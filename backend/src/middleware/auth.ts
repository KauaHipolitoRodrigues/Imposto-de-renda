import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

interface JwtPayload {
  id: string;
  userType: 'client' | 'accountant';
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw createError(401, 'Not authorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Not authorized'));
  }
};

export const accountantOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 'accountant') {
    return next(createError(403, 'Access denied. Accountants only.'));
  }
  next();
};

export const clientOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userType !== 'client') {
    return next(createError(403, 'Access denied. Clients only.'));
  }
  next();
};