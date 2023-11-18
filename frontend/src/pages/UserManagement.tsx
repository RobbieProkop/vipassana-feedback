import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/states";
import axios from "axios";
import { BASE_URL } from "../constants";

const Users = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    axios
      .get(`${BASE_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("users", users);
  return (
    <div>
      <h1>User Management</h1>
    </div>
  );
};
export default Users;
