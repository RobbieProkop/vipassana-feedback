import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/states";
import axios from "axios";
import { USERS_URL } from "../constants";
import { checkAuth } from "../utils/helpers";
import Card from "../components/Card/Card";
import styles from "../styles/feedbackDashboard.module.scss";
import ErrorPage from "./ErrorPage";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isUnauth, setIsUnauth] = useState<boolean>(false);

  useEffect(() => {
    if (!checkAuth(true)) {
      localStorage.removeItem("userInfo");
      navigate("/login");
      return;
    }

    axios
      .get(`${USERS_URL}`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsUnauth(true);
      });
  }, []);

  users.sort((a, b) => {
    if (a.id < b.id) return -1;
    return 1;
  });

  if (isUnauth) {
    return <ErrorPage />;
  }

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
      <button
        className={`btn btn-block ${styles.button}`}
        onClick={() => {
          navigate("/admin/addUser");
        }}
      >
        Add User
      </button>
    </div>
  );
};
export default Users;
