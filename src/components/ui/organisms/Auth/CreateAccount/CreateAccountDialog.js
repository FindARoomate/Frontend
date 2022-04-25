import { CREATE_ACCOUNT } from '../../../../routes';
import styles from './CreateAccountDialog.module.css';
import googleIcon from '../../../../../icons/google-icon.svg';
import Button from "../../../atoms/Button/Button";
import H3 from "../../../atoms/Headings/H3/H3";
import Input from '../../../atoms/Input/Input';
import Label from '../../../atoms/Label/Label';
import Img from '../../../atoms/Img/Img';
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";
import { useState } from 'react';

const CreateAccountDialog = ({open, closeModal}) => 
{

    const placeholderFunction = () => {}
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e) => 
    {
        //prevent form submit
        e.preventDefault();

        //set loading message
        setIsLoading(true);
        
        const credentials = 
        {
            email: e.target[0].value,
            password: e.target[1].value        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        fetch(CREATE_ACCOUNT,
        {
            method: "POST",
            body: JSON.stringify(credentials),
            redirect: "follow",
            mode: "cors",
            headers: myHeaders
        })
        .then (async (res) => 
        {
            const body = await res.json();

            if(!res.ok)
            {
                console.log(body);

                var errorMessage = body.message;
                // errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);//capitalize first letter
                // throw new Error(body);
            }

            console.log(body);
            //remove loading message
            setIsLoading(false)
            //remove error message
            setError()
            //show success message
            setIsAccountCreated(true);
        })
        .catch((error) => 
        {   
            //remove loading message
            setIsLoading(false);

            console.log(error);
            //show error message
            setError(error.message);
            //remove success message
            setIsAccountCreated(false);
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