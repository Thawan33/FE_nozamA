export interface DecodedToken {
  sub: string;    // Username
  role: string;   // "USER" ou "ADMIN"
  exp: number;    // Expiração
}