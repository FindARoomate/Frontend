import { useState } from "react";
import Input from "./Input.js";
import openedEyeIcon from "./../../../../icons/opened-eye-icon.svg";
import closedEyeIcon from "./../../../../icons/closed-eye-icon.svg";
import Img from "./../Img/Img";
import styles from "./PasswordInput.module.css";

const PasswordInput = ({name, placeholder, ...props}) => {
  const [viewPassword, setViewPassword] = useState(false);

  const handleOnClick = () => setViewPassword(!viewPassword);

  return (
    <span className={styles.passwordInput}>
      <Input type={viewPassword ? "text" : "password"} name={name} placeholder={placeholder} {...props} />
      <Img
        onClick={handleOnClick}
        src={viewPassword ? openedEyeIcon: closedEyeIcon}
      />
    </span>
  );
};

export default PasswordInput;
