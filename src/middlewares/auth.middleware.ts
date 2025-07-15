import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { error } from '../utils/responseFormat.util';

const JWT_SECRET = process.env.JWT_SECRET as string;

function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json(error('Token not found', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token) as { id: number };
        (req as any).user = decoded.id;
        next();
    } catch (err) {
        return res.json(error('Invalid token', 403));
    }
};
