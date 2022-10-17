export type TUser = {
  id: string;
  username: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user: TUser;
    }
  }
}
