declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    userId: string;
  }
}

export {};
