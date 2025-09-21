import { sign, verify } from "jsonwebtoken";

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
  const token = sign({ ...data },process.env.AccessTokenSecretKey, {
    expiresIn: "20h",
  });
  return token;
};

const verifyAccessToken = (token) => {
  try {
    const decoded = verify(token,process.env.AccessTokenSecretKey);
    return decoded;
  } catch (error) {
    console.log("JWT verify error:", error.message);
    return null;
  }
};
const generateRefreshToken=(data)=>{
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey,{
    expiresIn:"15d"
  });
  return token;
}

const valiadteEmail = (email) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

const valiadtePhone = (phone) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

const valiadtePassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};
export { hashPassword, verifyPassword,generateAccessToken,verifyAccessToken ,generateRefreshToken,valiadteEmail,valiadtePassword,valiadtePhone};
