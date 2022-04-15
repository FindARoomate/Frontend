import Button from "./Button";
import styles from './CreateAccountButton.module.css';

const CreateAccountButton = () => {
    return ( 
        <div className={styles.createAccount}>
            <Button>Create account</Button>
        </div>
     );
}
 
export default CreateAccountButton;