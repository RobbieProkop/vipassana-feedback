import { UserType } from "../models/userModel.js";

const userResponse = (user: UserType) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  isAdmin: user.isAdmin,
});

export default userResponse;
