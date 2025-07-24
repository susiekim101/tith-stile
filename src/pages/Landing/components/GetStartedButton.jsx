import styles from "./GetStartedButton.module.css";
import { useNavigate } from "react-router-dom";

const GetStartedButton = ({ textColor, bgColor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${styles[textColor]} ${styles[bgColor]}`}
    >
      Start your design journey &rarr;
    </button>
  );
};

export default GetStartedButton;
