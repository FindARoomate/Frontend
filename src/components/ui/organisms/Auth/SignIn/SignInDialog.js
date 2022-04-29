import ErrorAlert from './../../../molecules/Alerts/ErrorAlert/ErrorAlert';
import googleIcon from '../../../../../icons/google-icon.svg';
import usePost from './../../../../../customHooks/usePost';
import { Link, Navigate } from "react-router-dom";
import Button from "../../../atoms/Button/Button";
import H3 from "../../../atoms/Headings/H3/H3";
import styles from './SignInDialog.module.css';
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import { LOGIN } from '../../../../routes';
import {useState, useEffect} from 'react';
import Img from '../../../atoms/Img/Img';
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";


const SignInDialog = ({open, closeModal}) =>
{

    const placeholderFunction = () => {}

    const [isLoading, setIsLoading] = useState(false);
    const {isSuccess, data, isError, sendPostRequest} = usePost(LOGIN)

    const handleSignIn = (e) => 
    {
        e.preventDefault();
        setIsLoading(true);
        //trigger login request to backend
        sendPostRequest({email: e.target[0].value, password: e.target[1].value});
    }

    useEffect(() => 
    {
        //after getting a response from database, remove loading message
        if(isSuccess || isError)
        { 
            setIsLoading(false); 
        }

        if(isSuccess)
        {
            localStorage.setItem("accessToken", data.access);  //add access token to localStorage
            localStorage.setItem("refreshToken", data.refresh); //add refresh token to localStorage
            console.log(data);
        }

    }, [isError, isSuccess, data]);
  

    return ( 
        <div className={styles.signInDialogContainer}>

        {/* move them to the on boarding screens on login */}
        {isSuccess && <Navigate replace to="/create-profile-instruction"/>}

            <Modal open={open} closeModal={closeModal}>
            <div className={styles.signInDialog}>  
                <div className={styles.heading}>
                    <H3>SIGN IN</H3>
                    <P>It's nice having you here again</P>
                </div>
                <div className={styles.form}>
                    <form onSubmit={handleSignIn}>
                        {isError && <ErrorAlert message= {data.detail}/>}
                        <div className={styles.inputGroup}>
                            <Label>Email</Label>
                            <Input type="text" placeholder="Enter your email address"/>
                        </div>
                        <div className={styles.inputGroup}>
                            <Label>Password</Label>
                            <Input type="text" placeholder="Enter your password"/>
                        </div>
                        <Button handleOnClick={placeholderFunction}>{isLoading ? "Loading..." : "Sign In"}</Button>
                        <div className={styles.divider}><span>or</span></div>
                        <div className={styles.bottom}>
                            <Button handleOnClick={placeholderFunction}><Img src={googleIcon}/><P>Continue with Google</P></Button>
                            <P>Don't have an account? <Link to="/">Sign up</Link></P>
                        </div>
                    </form>
                </div>
            </div>
            </Modal>
        </div>
     );
}
 
export default SignInDialog;