import Button from "../../../atoms/Button/Button";
import H3 from "../../../atoms/Headings/H3/H3";
import styles from './CreateAccountDialog.module.css';
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";

const CreateAccountDialog = ({open, closeModal}) => {
    return ( 
        <Modal open={open} closeModal={closeModal}>
        <div className={styles.createAccountDialog}>  
            <div className={styles.heading}>
                <H3>SIGN UP</H3>
                <P></P>
            </div>
            <div className={styles.form}>
                <div className={styles.inputGroup}>
                    <Label>Email</Label>
                    <Input type="text" placeholder="Enter your email address"/>
                </div>
                <div className={styles.inputGroup}>
                    <Label>Password</Label>
                    <Input type="text" placeholder="Enter your password"/>
                </div>
                <div className={styles.inputGroup}>
                    <Label>Confirm Password</Label>
                    <Input type="text" placeholder="Enter your password again"/>
                </div>
               <Button>Sign Up</Button>
            </div>
        </div>
    </Modal>
     );
}
 
export default CreateAccountDialog;