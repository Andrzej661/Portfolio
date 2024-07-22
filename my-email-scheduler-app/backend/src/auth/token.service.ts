// This could be part of your AuthService or a separate utility service
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// A utility function to extract the JWT token from the request
export function extractToken(req: Request): string | null {
  // Attempt to retrieve the token from cookies first
  const tokenFromCookies = req.cookies?.['token'];

  if (tokenFromCookies) {
    return tokenFromCookies;
  }

  // If not in cookies, check the Authorization header
  const authHeader = req.headers.authorization;

  // Expecting the Authorization header to be "Bearer [token]"
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = tokenFromCookies || authHeader?.substring(7);
    console.log('Extracted Token:', token);
    return token;
  }

  // Return null if no token found
  return null;
}

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  decodeToken(token: string): any {
    console.log('Decoding Token:', token);
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      console.error('Error decoding token:', token, error);
      throw error; // Consider re-throwing the error for further clarity
    }
  }
}
