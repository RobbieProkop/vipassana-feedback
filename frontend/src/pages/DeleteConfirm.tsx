import { useParams } from "react-router-dom";
import { USERS_URL } from "../constants";
import axios from "axios";
import { User } from "../utils/states";
import { useEffect, useState } from "react";

const DeleteConfirm = () => {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);

  const findUser = async () => {
    try {
      const { data } = await axios.get(`${USERS_URL}/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div>
      <h1>
        Are you sure you want to delete {user ? user.username : `user ${id}?`}
      </h1>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};
export default DeleteConfirm;
