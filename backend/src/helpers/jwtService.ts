import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

interface UserPayload {
  userId: mongoose.Types.ObjectId;
}

interface DecodedToken extends UserPayload {
  iat: number;
  exp: number;
  iss: string;
}

export class JWTService {
  static generateToken(payload: UserPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '24h',
      issuer: 'my-app',
    });
  }

  static verifyToken(token: string): DecodedToken {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  }

  static decodeToken(token: string): DecodedToken | null {
    try {
      return jwt.verify(token, JWT_SECRET) as DecodedToken;
    } catch {
      return null;
    }
  }
}
