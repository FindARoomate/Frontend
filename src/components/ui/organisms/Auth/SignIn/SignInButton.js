import Button from "../../../atoms/Button/Button";
import styles from './SignInButton.module.css';

const SignInButton = ({openSignInDialog, text=null}) => 
{

    const handleOnClick = () =>
    {
        openSignInDialog();
    }

    return (
        <div className={styles.signIn}>
            <Button handleOnClick={handleOnClick}>{text ? text: "Sign In"}</Button>
        </div> 
     );
}
 
export default SignInButton;