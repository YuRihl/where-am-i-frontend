export interface IUserWithPoints {
  id: number;
  username: string;
  email: string;
  password: string | null;
  isRegisteredWithGoogle: boolean;
  firstName: string;
  lastName: string | null;
  websocketId: string | null;
  createdAt: Date;
  updatedAt: Date;
  summaryPoints: number;
}
