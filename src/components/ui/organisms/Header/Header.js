import logo from './../../../../images/logo.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import SignInButton from '../../atoms/Button/SignInButton';
import CreateAccountButton from '../../atoms/Button/CreateAccountButton';
import { useState } from 'react';

const Header = ({customStyle, signIn, createAccount, links}) => {

    const [hamburgerState, updateHamburgerState] = useState(styles.close);
    const [menuState, updateMenuState] = useState(styles.closeMobileMenu);

    const handleClick = () => 
    {
        if (hamburgerState == styles.close)
        {
            updateHamburgerState(styles.open);//change the "X" icon back to hamburger
            updateMenuState(styles.openMobileMenu);//appear the mobile menu
        }else
        {
            updateHamburgerState(styles.close);//change hamburger to "X" icon
            updateMenuState(styles.closeMobileMenu);//disappear the mobile menu
        }
    }
    return ( 
        <header className={styles.header}
        style = {customStyle ? customStyle : {}}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            <div className={styles.desktopNav}>

                {/* Get all links */}

                {links && links.map((link) => {
                    return (
                        <Link key={link.id} to={link.path}>{link.text}</Link>
                    )
                })}
                {signIn && <SignInButton/>}
                {createAccount && <CreateAccountButton/>}
            </div>
            <div onClick={handleClick} className={`${styles.mobileNav} ${hamburgerState}`} >
                <div className={styles.hamburger}></div>

                <div className={`${styles.mobileMenu} ${menuState}`}>
                    {links && links.map((link) => {
                        return (
                            <Link key={link.id} to={link.path}>{link.text}</Link>
                        )
                    })}
                    {signIn && <SignInButton/>}
                    {createAccount && <CreateAccountButton/>}
                </div>

            </div>
        </header>
     );
}
 
export default Header;