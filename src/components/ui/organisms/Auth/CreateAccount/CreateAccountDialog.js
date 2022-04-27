import SuccessAlert from './../../../molecules/Alerts/SuccessAlert/SuccessAlert';
import ErrorAlert from './../../../molecules/Alerts/ErrorAlert/ErrorAlert';
import googleIcon from '../../../../../icons/google-icon.svg';
import usePost from './../../../../../customHooks/usePost';
import CreateAccountErrors from './CreateAccountErrors';
import styles from './CreateAccountDialog.module.css';
import { CREATE_ACCOUNT } from '../../../../routes';
import Button from "../../../atoms/Button/Button";
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import H3 from "../../../atoms/Headings/H3/H3";
import { useState, useEffect } from 'react';
import Img from '../../../atoms/Img/Img';
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";

const CreateAccountDialog = ({open, closeModal}) => 
{

    const placeholderFunction = () => {}
    const [isLoading, setIsLoading] = useState(false);
    const {isSuccess, data, isError, sendPostRequest} = usePost(CREATE_ACCOUNT)

    const handleSignUp = (e) => 
    {
        e.preventDefault();
        setIsLoading(true);
        //trigger create account request to backend
        sendPostRequest({
            email: e.target[0].value,
            password: e.target[1].value,
            confirm_password: e.target[2].value        
        });        
    }

    useEffect(() => 
    {
        //after getting a response from database, remove loading message
        if(isSuccess || isError)
        { 
            setIsLoading(false); 
          
            // console.log(data.email[0])
        }
    }, [isError, isSuccess, data]);

    const showErrors = (errors) =>
    {
        const entries = Object.entries(errors);
        console.log(entries);

        entries.map((error) => {
           return (
           <ErrorAlert 
                key={error[0]}
                message={error[1][0]}
            />)
        });
    }

    return ( 
        <div className={styles.createAccountDialogContainer}>
        <Modal open={open} closeModal={closeModal}>
        <div className={styles.createAccountDialog}>  
            <div className={styles.heading}>
                <H3>SIGN UP</H3>
                <P>Find and connect to your ideal roommate</P>
            </div>
            <div className={styles.form}>
                <form onSubmit={(e) => handleSignUp(e)}>
                    {isError &&  <CreateAccountErrors errors={data}/>}
                    {isSuccess && <SuccessAlert message={data.message}/>}
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
                <Button handleOnClick={placeholderFunction}>{isLoading ? "Loading..." : "Sign Up"}</Button>
                </form>
            </div>
            <div className={styles.divider}><span>or</span></div>
            <div className={styles.bottom}>
                <Button><Img src={googleIcon}/><P>Sign up with Google</P></Button>
                <P>Already have an account? <Link to="/">Login</Link></P>
            </div>
        </div>
    </Modal>
    </div>
     );
}
 
export default CreateAccountDialog;