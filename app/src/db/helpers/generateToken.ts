import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
