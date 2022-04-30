import Button from "../../../atoms/Button/Button";
import Modal from "../../Modal/Modal";
import styles from './SignInButton.module.css';
import { useState } from "react";
const SignInButton = ({openSignInDialog}) => 
{

    const handleOnClick = () =>
    {
        openSignInDialog();
    }

    return (
        <div className={styles.signIn}>
            <Button handleOnClick={handleOnClick}>Sign In</Button>
        </div> 
     );
}
 
export default SignInButton;