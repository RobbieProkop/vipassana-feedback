import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/states";
import axios from "axios";
import { BASE_URL } from "../constants";
import { checkAuth } from "../utils/helpers";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    checkAuth(navigate);
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
