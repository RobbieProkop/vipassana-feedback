import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Feedback } from "../utils/states";

const FeedbackPage = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

  const [feedback, setFeedback] = useState<Feedback>({} as Feedback);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <h1>Feedback</h1>
    </div>
  );
};
export default FeedbackPage;
