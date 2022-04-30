import logo from './../../../../images/logo.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import SignInButton from '../Auth/SignIn/SignInButton';
import CreateAccountButton from '../Auth/CreateAccount/CreateAccountButton';
import {useState } from 'react';
import Modal from '../Modal/Modal';
import SignInDialog from '../Auth/SignIn/SignInDialog';
import CreateAccountDialog from '../Auth/CreateAccount/CreateAccountDialog';

const Header = ({customStyle, signIn, createAccount, links}) => {

    //variable to check if there are any links available
    var areLinksAvailable = false;
    if(signIn) areLinksAvailable = true;
    if(createAccount) areLinksAvailable = true;
    if(links) areLinksAvailable = true;

    // Create Account Menu Dialog Box controls
    const [createAccountModalState, updateCreateAccountModalState] = useState(false);
    const openCreateAccountDialog = () => 
    {
        updateModalState(false); //close mobile menu dialog
        updateSignInModalState(false);//close sign in menu dialog
        updateCreateAccountModalState(true); //open create account dialog
    }
    const closeCreateAccountDialog = () => 
    {
        updateCreateAccountModalState(false);
    }

    // Sign In Menu Dialog Box controls
    const [signInModalState, updateSignInModalState] = useState(false);
    const openSignInDialog = () => 
    {
        updateModalState(false);//close mobile menu dialog
        updateCreateAccountModalState(false);//close create account menu dialog
        updateSignInModalState(true); //open sign in dialog (if open)
    }
    const closeSignInDialog = () => 
    {
        updateSignInModalState(false);
    }

    // Mobile Menu Dialog Box controls
    const [modalState, updateModalState] = useState(false);
    const openMobileDialog  = () =>  updateModalState(true);//open menu dialog
    const closeMobileDialog = () => updateModalState(false);//close menu dialog
    

    return ( 
        <div className={styles.headerContainer}>

        <header className={styles.header} style = {customStyle ? customStyle : {}}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>

            {/* Desktop Nav Bar */}
            <div className={styles.desktopNav}>
                {/* Get all links */}
                {links && links.map((link) => {
                    return (
                        <Link key={link.id} to={link.path}>{link.text}</Link>
                    )
                })}
                {signIn && <SignInButton openSignInDialog={openSignInDialog}/>}
                {createAccount && <CreateAccountButton openCreateAccountDialog={openCreateAccountDialog}/>}
            </div> 

            {/* Harmburger Icon */}
            {areLinksAvailable && (
                <div onClick={openMobileDialog} className={styles.mobileNav} >
                    <div className={styles.hamburger}></div>
                </div>
            )}


        </header>
        <div>
            {/* Mobile Pop-up */}
            <div className={styles.mobileMenuModal}>
                <Modal closeModal={closeMobileDialog} open={modalState} >
                    {links && links.map((link) => {
                        return (
                            <Link onClick={closeMobileDialog} key={link.id} to={link.path}>{link.text}</Link>
                        )
                    })}
                    {signIn && <SignInButton openSignInDialog={openSignInDialog}/>}
                    {createAccount && <CreateAccountButton openCreateAccountDialog={openCreateAccountDialog}/>}
                </Modal>  
            </div>
                              
            {/* Sign In Pop-up */}
            <div className={styles.signInModal}>
                <SignInDialog open={signInModalState} closeModal={closeSignInDialog}/>
            </div>

             {/* Create Account In Pop-up */}
             <div className={styles.createAccountModal}>
                <CreateAccountDialog open={createAccountModalState} closeModal={closeCreateAccountDialog}/>
            </div>
            </div>
           
        </div>
     );
}
 
export default Header;