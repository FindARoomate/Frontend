import P from '../../atoms/P/P';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import {Navigate} from "react-router-dom";
import styles from './LogoutDialog.module.css';
import Button from '../../atoms/Button/Button';

const LogoutDialog = ({open, closeModal}) => 
{
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    
    const logout = () => 
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("profile_data");

        if(window.location.pathname == "/")
        {
            window.location.reload();
        }
        else 
        {
            setIsLoggedOut(true);
        }
    }

    return ( 
        <>
        {/* If user is currently on home page, this will lead to infinite re-render. Don't navigate when on home page. Just close the logout modal */}
        {isLoggedOut && window.location.replace("/")}
         <Modal 
            open={open} 
            closeModal={closeModal}
            customStyles={{
                padding: "40px 37px",
                width: "624px"
            }}
        >
            <div className={styles.logoutDialog}>
                <P>Are you sure you want to log out?</P>
                <span>
                    <Button handleOnClick={logout}>Yes, log me out</Button>
                    <Button className={styles.backButton} handleOnClick={closeModal}>No, go back</Button>
                </span>
            </div>
        </Modal>
        </>
     );
}
 
export default LogoutDialog;