import bcrypt from "bcryptjs";

export const hashPass = (password: string): string => {
  return bcrypt.hashSync(password);
};

export const comparedPass = (password: string, hashPass: string): boolean => {
  return bcrypt.compareSync(password, hashPass);
};