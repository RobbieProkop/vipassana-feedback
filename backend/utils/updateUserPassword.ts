import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

const updateUserPassword = async (
  user: UserModel,
  prevPassword: string,
  newPassword: string
) => {
  const hashedPassword = user.password;
  const isMatch = await bcrypt.compare(prevPassword, hashedPassword);

  if (!isMatch) return false;

  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = newHashedPassword;
  return true;
};

export default updateUserPassword;
