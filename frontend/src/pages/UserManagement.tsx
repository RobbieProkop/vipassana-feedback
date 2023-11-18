import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>User Management</h1>
    </div>
  );
};
export default Users;
