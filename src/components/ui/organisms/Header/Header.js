import Modal from '../Modal/Modal';
import { useContext } from 'react';
import {Link} from 'react-router-dom';
import Img from './../../atoms/Img/Img';
import styles from './Header.module.css';
import { UserContext } from '../../../context';
import logo from './../../../../images/logo.svg';
import {useState, useEffect, memo } from 'react';
import SignInDialog from '../Auth/SignIn/SignInDialog';
import SignInButton from '../Auth/SignIn/SignInButton';
import logoutIcon from './../../../../icons/logout-icon.svg';
import CreateAccountDialog from '../Auth/CreateAccount/CreateAccountDialog';
import CreateAccountButton from '../Auth/CreateAccount/CreateAccountButton';
import LogoutDialog from '../LogoutDialog/LogoutDialog';
import HeaderDropdown from '../../molecules/HeaderDropdown/HeaderDropdown';


const Header = ({customStyle, signIn, createAccount, showProfile, showLogout, links, mobileLinks}) => {

    //get user info
    const {isUserLoggedIn, userProfile} = useContext(UserContext);

    //variable to check if there are any links available
    var areLinksAvailable = signIn || createAccount || links || mobileLinks || localStorage.getItem("accessToken");

    // Create Account Menu Dialog Box controls
    const [logoutModalState, setLogoutModalState] = useState(false);
    const closeLogoutDialog = () => setLogoutModalState(false);
    const openLogoutDialog = () => 
    {
      updateModalState(false); //close mobile menu dialog
      setLogoutModalState(true);
    }

    // Create Account Menu Dialog Box controls
    const [createAccountModalState, updateCreateAccountModalState] = useState(false);
    const closeCreateAccountDialog = () => updateCreateAccountModalState(false);
    const openCreateAccountDialog = () => 
    {
        updateModalState(false); //close mobile menu dialog
        updateSignInModalState(false);//close sign in menu dialog
        updateCreateAccountModalState(true); //open create account dialog
    }

    // Sign In Menu Dialog Box controls
    const [signInModalState, updateSignInModalState] = useState(false);
    const closeSignInDialog = () => updateSignInModalState(false);
    const openSignInDialog = () => 
    {
        updateModalState(false);//close mobile menu dialog
        updateCreateAccountModalState(false);//close create account menu dialog
        updateSignInModalState(true); //open sign in dialog (if open)
    }

    // Mobile Menu Dialog Box controls
    const [modalState, updateModalState] = useState(false);
    const openMobileDialog  = () =>  updateModalState(true);//open menu dialog
    const closeMobileDialog = () => updateModalState(false);//close menu dialog


    const [scrollPosition, setScrollPosition] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

    let headerStyles;
    
    const handleScroll = () => 
    {
      const position = window.pageYOffset;
      const width = window.innerWidth;
      setScrollPosition(position);
      setScreenWidth(width);
    };

    useEffect(() => 
    {
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    
    if (scrollPosition >= 56) {
        headerStyles = "headerStyles"
        customStyle = {}
    }
    
    return (
      <div className={styles.headerContainer}>
        <header
          className={[styles.header, styles[headerStyles]].join(" ")}
          style={customStyle}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
          </div>

          {/* Desktop Nav Bar */}
          <div className={styles.desktopNav}>
            {/* Get all links */}
            {links &&
              links.map((link) => {
                return (
                  <Link key={link.id} to={link.path}>
                    {link.text}
                  </Link>
                );
              })}

            {/* Only display sign in and create account links if user is not logged in */}
            {/* If user is logged in display profile */}
              {((signIn || createAccount) && isUserLoggedIn) ? 
                  <HeaderDropdown/>
                : 
                <>
                {signIn && <SignInButton openSignInDialog={openSignInDialog} />}
                {createAccount && <CreateAccountButton openCreateAccountDialog={openCreateAccountDialog}/>}
                </>                
               }

            {showProfile && <HeaderDropdown/>}

          </div>

          {/* Harmburger Icon */}
          {areLinksAvailable && (
            <div onClick={openMobileDialog} className={styles.mobileNav}>
              <div className={styles.hamburger}></div>
            </div>
          )}

        </header>
        <div>
          {/* Mobile Pop-up */}
          <div className={styles.mobileMenuModal}>
            <Modal closeModal={closeMobileDialog} open={modalState}>
            
            {showProfile && <HeaderDropdown/>}

              {mobileLinks && (
                <div className={styles.mobileOnlyLinks}>
                  {mobileLinks.map((link) => <Link onClick={closeMobileDialog} key={link.id} to={link.path}>{link.text}</Link>)}
                </div>
              )}

              {links &&
                <div className={styles.mobileLinks}>
                  {links.map((link) => <Link onClick={closeMobileDialog} key={link.id} to={link.path}> {link.text} </Link>)}
                </div>
                }


              {/* Only display sign in and create account links if user is not logged in */}
              {((signIn || createAccount) &&  !isUserLoggedIn) &&  
                <>
                {signIn && <SignInButton openSignInDialog={openSignInDialog} />}
                {createAccount && <CreateAccountButton openCreateAccountDialog={openCreateAccountDialog}/>}
                </>                
               }

               {/* If user is logged in display profile */}
              {isUserLoggedIn && <HeaderDropdown/> }

            {showLogout && 
              <div onClick={openLogoutDialog} className={styles.logoutLink}>
                <Img src={logoutIcon}/><span>Logout</span>
              </div>
            }
            </Modal>
          </div>

          {/* Sign In Pop-up */}
          <div className={styles.signInModal}>
            <SignInDialog
              open={signInModalState}
              closeModal={closeSignInDialog}
              openCreateAccountModal={openCreateAccountDialog}
            />
          </div>

          {/* Create Account In Pop-up */}
          <div className={styles.createAccountModal}>
            <CreateAccountDialog
              open={createAccountModalState}
              closeModal={closeCreateAccountDialog}
              openSignInModal={openSignInDialog}
            />
          </div>

            {/* Logout pop-up */}
            <LogoutDialog
              open={logoutModalState}
              closeModal={closeLogoutDialog}
            />
        </div>
      </div>
    );
}
 
export default memo(Header);