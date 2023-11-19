import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/states";
import axios from "axios";
import { USERS_URL } from "../constants";
import { checkAuth } from "../utils/helpers";
import Card from "../components/Card/Card";
import styles from "../styles/feedbackDashboard.module.scss";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    checkAuth(navigate);
    axios
      .get(`${USERS_URL}`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("users", users);
  return (
    <div className="container">
      <h1>User Management</h1>
      <div className={styles.grid}>
        {users &&
          users.map((user) => (
            <div
              className={`${styles.feedbackCard} ${styles.modal}`}
              key={user.id}
            >
              <Card user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Users;
