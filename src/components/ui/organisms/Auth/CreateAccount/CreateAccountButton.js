import Button from "../../../atoms/Button/Button";
import styles from './CreateAccountButton.module.css';

const CreateAccountButton = ({openCreateAccountDialog}) => {

    const handleCreateAccountClick = () => 
    {
        openCreateAccountDialog();
    }

    return ( 
        <div className={styles.createAccount}>
            <Button handleOnClick={handleCreateAccountClick}>Create account</Button>
        </div>
     );
}
 
export default CreateAccountButton;