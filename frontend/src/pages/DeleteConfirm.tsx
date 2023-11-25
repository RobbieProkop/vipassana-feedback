import { useNavigate, useParams } from "react-router-dom";
import { USERS_URL } from "../constants";
import axios from "axios";
import { User } from "../utils/states";
import { useEffect, useState } from "react";
import profile from "../styles/profile.module.scss";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DeleteConfirm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);

  const findUser = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}/${id}`, {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findUser();
    console.log(user);
  }, []);

  const deleteUser = async () => {
    if (!user || user === null) {
      Swal.fire({
        title: "Unable to delete...",
        text: "User not found",
        icon: "error",
      });
    }
    try {
      await axios.delete(`${USERS_URL}/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      navigate("/admin/users");
    }
  };

  const cancel = () => {
    navigate("/admin/users");
  };

  console.log(user);

  return (
    <div className="container">
      <h1>
        Are you sure you want to delete{" "}
        {user ? `${user.username}?` : `user ${id}?`}
      </h1>
      <div className="buttons">
        <button className="btn btn-cancel" onClick={cancel}>
          Cancel
        </button>

        <button className="btn btn-danger" onClick={deleteUser}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default DeleteConfirm;
