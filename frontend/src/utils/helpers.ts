import axios from "axios";

export const checkAuth = async (isAdmin: boolean) => {
  if (isAdmin) {
    try {
      const res = await axios.get("/api/authenticate/admin");
      if (res.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  } else {
    try {
      const res = await axios.get("/api/authenticate", {
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
