import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const thankyou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  return (
    <div>
      <h1>Thank you for your feedback!</h1>
    </div>
  );
};
export default thankyou;
