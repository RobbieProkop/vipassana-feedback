import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const checkAuth = async (navigate: NavigateFunction) => {
  try {
    const res = await axios.get("/api/authenticate");
    if (res.status !== 200) {
      navigate("/login");
    }
  } catch (error) {
    navigate("/login");
  }
};
