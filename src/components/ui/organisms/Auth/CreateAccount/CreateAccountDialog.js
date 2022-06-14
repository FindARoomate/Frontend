import { signUpValidation, signUpInitialValues } from './CreateAccountHelper';
import SuccessAlert from '../../../molecules/Alerts/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../../molecules/Alerts/ErrorAlert/ErrorAlert';
import PasswordInput from './../../../atoms/Input/PasswordInput';
import googleIcon from '../../../../../icons/google-icon.svg';
import usePost from '../../../../../customHooks/usePost';
import CreateAccountErrors from './CreateAccountErrors';
import styles from './CreateAccountDialog.module.css';
import { CREATE_ACCOUNT } from '../../../../routes';
import Button from "../../../atoms/Button/Button";
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import H3 from "../../../atoms/Headings/H3/H3";
import { useState, useEffect, memo } from 'react';
import Img from '../../../atoms/Img/Img';
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";
import { Formik } from 'formik';

const CreateAccountDialog = ({open, closeModal, openSignInModal}) => 
{

    const headers = new Headers();
    const [isLoading, setIsLoading] = useState(false);
    const {isSuccess, APIdata, isError, sendPostRequest} = usePost(CREATE_ACCOUNT, headers)
    const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);
    const handleSignUp = (e, formik) => 
    { 
        e.preventDefault();
        setSignUpButtonClicked(true);

        if(Object.values(formik.errors).length <= 0)
        {
            setIsLoading(true);
            //trigger create account request to backend

            const formData = new FormData();
            formData.append("email", e.target[0].value);
            formData.append("password", e.target[1].value);
            formData.append("confirm_password", e.target[2].value);
            sendPostRequest(formData);  
        }      
    }

    useEffect(() => 
    {
        //after getting a response from database, remove loading message
        if(isSuccess || isError)
        { 
            setIsLoading(false); 
        }
    }, [isError, isSuccess, APIdata]);

    const handleSignInOnClick = (e) => 
    {
        e.preventDefault();
        openSignInModal();
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
            <Formik
                initialValues = {signUpInitialValues}
                validationSchema = {signUpValidation}
                onSubmit = {handleSignUp}
            >
           {formik => (
                <form onSubmit={(e) => handleSignUp(e, formik)}>
                    {isError &&  <CreateAccountErrors errors={APIdata}/>}
                    {isSuccess && <SuccessAlert message={APIdata.message}/>}
                    <div className={styles.inputGroup}>
                        <Label>Email</Label>
                        <Input type="text" name="email" {...formik.getFieldProps('email')} placeholder="Enter your email address"/>
                        {signUpButtonClicked && (formik.errors.email && <ErrorAlert>{formik.errors.email}</ErrorAlert>)}
                    </div>
                    <div className={styles.inputGroup}>
                        <Label>Password</Label>
                        <PasswordInput name="password" {...formik.getFieldProps('password')} placeholder="Enter your password" />
                        {signUpButtonClicked && (formik.errors.password && <ErrorAlert>{formik.errors.password}</ErrorAlert>)}
                    </div>
                    <div className={styles.inputGroup}>
                        <Label>Confirm Password</Label>
                        <PasswordInput name="password_confirmation" {...formik.getFieldProps('password_confirmation')} placeholder="Enter your password again" />
                        {signUpButtonClicked && (formik.errors.password_confirmation && <ErrorAlert>{formik.errors.password_confirmation}</ErrorAlert>)}
                    </div>
                <Button className={isLoading ? "isLoading": ""}>{isLoading ? "Loading..." : "Sign Up"}</Button>
                </form>
           )}
           </Formik>
            </div>
            <div className={styles.divider}><span>or</span></div>
            <div className={styles.bottom}>
                <Button><Img src={googleIcon}/><P>Sign up with Google</P></Button>
                <P>Already have an account? <span onClick={handleSignInOnClick}>Login</span></P>
            </div>
        </div>
    </Modal>
    </div>
     );
}
 
export default memo(CreateAccountDialog);