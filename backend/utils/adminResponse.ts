import { UserType } from "../models/userModel.js";

const adminResponse = (users: UserType[]) =>
  users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  }));

export default adminResponse;
