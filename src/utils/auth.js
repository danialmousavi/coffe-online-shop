import { sign } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.AccessTokenSecretKey,{
    expiresIn:"60s"
  });
  return token;
};
const verifyAccessToken = () => {
  try {
    const decoded = verify(token, process.env.AccessTokenSecretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};
const generateRefreshToken=(data)=>{
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey,{
    expiresIn:"15d"
  });
  return token;
}
export { hashPassword, verifyPassword,generateAccessToken,verifyAccessToken };
