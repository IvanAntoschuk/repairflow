import { jwtVerify, SignJWT } from "jose";

export const TOKEN_COOKIE = "rf_token";
export const TOKEN_MAX_AGE_SECONDS = 8 * 60 * 60;

const secretValue = process.env.JWT_SECRET;
if (!secretValue) throw new Error("JWT_SECRET is not set");
const secret = new TextEncoder().encode(secretValue);

export async function signToken(userId: string) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyToken(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export function readTokenCookie(header: string | undefined) {
  return header
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${TOKEN_COOKIE}=`))
    ?.slice(TOKEN_COOKIE.length + 1);
}
