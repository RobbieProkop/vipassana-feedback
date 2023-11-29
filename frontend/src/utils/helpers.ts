import axios from "axios";
import { BASE_URL } from "../constants";

export const checkAuth = async (isAdmin: boolean) => {
  if (isAdmin) {
    try {
      const res = await axios.get(`${BASE_URL}/api/authenticate/admin`, {
        withCredentials: true,
      });
      if (res.status !== 200) {
        console.log("res", res);
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  } else {
    try {
      const res = await axios.get(`${BASE_URL}/api/authenticate`, {
        withCredentials: true,
      });
      if (res.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
};
