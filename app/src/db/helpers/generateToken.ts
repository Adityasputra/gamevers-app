import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyTokenJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(JWT_SECRET);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);
  return payloadJose.payload;
};
