// Author: Alejandro Arteaga

export interface JwtPayload {
  sub: number;
  fullName: string;
  username: string;
  role: 'user' | 'admin';
  email: string;
  iat: number;
  exp: number;
}

/**
 * Decode a JWT token without verification (safe for reading payload on client)
 * Note: This doesn't verify the token, only decodes the payload
 */
export function decodeJWT(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    return payload as JwtPayload;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}
