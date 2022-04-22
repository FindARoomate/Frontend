import googleIcon from '../../../../../icons/google-icon.svg';
import Button from "../../../atoms/Button/Button";
import H3 from "../../../atoms/Headings/H3/H3";
import styles from './SignInDialog.module.css';
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import Img from '../../../atoms/Img/Img';
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";

const SignInDialog = ({open, closeModal}) =>
{
    return ( 
        <div className={styles.signInDialogContainer}>
            <Modal open={open} closeModal={closeModal}>
            <div className={styles.signInDialog}>  
                <div className={styles.heading}>
                    <H3>SIGN IN</H3>
                    <P>It's nice having you here again</P>
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
                   <Button>Sign In</Button>
                </div>
                <div className={styles.divider}><span>or</span></div>
                <div className={styles.bottom}>
                    <Button><Img src={googleIcon}/><P>Continue with Google</P></Button>
                    <P>Don't have an account? <Link to="/">Sign up</Link></P>
                </div>
            </div>
            </Modal>
        </div>
     );
}
 
export default SignInDialog;