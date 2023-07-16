export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    ipAddress: string | null;
    isVerified: boolean
    confirmationToken: string | null;
    isBanned: boolean;
    imageUrl: string | null;
    firstLoginAt: Date;
    lastLoginAt: Date | null;
  }