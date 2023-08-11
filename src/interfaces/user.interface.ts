export interface User {
  id: number;
  username: string;
  email: string;
  password: string | null;
  isRegisteredWithGoogle: boolean;
  firstName: string;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
