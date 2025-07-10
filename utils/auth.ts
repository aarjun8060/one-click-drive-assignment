import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * @param password
 * @param hashedPassword
 * @returns a boolean indicating whether the password matches the hashed password
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = ({ userId }: { userId: string }) => {
  const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "default_secret_key";
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
  const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "default_secret_key";
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as jwt.JwtPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
