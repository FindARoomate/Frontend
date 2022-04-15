import Button from "./Button";
import styles from './SignInButton.module.css';

const SignInButton = () => 
{
    return (
        <div className={styles.signIn}>
            <Button>Sign In</Button>
        </div> 
     );
}
 
export default SignInButton;