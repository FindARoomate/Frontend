import logo from './../../../../images/logo.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import SignInButton from '../../atoms/Button/SignInButton';
import CreateAccountButton from '../../atoms/Button/CreateAccountButton';
import {useState } from 'react';
import Modal from '../Modal/Modal';

const Header = ({customStyle, signIn, createAccount, links}) => {

    const [hamburgerState, updateHamburgerState] = useState(styles.close);
    const [modalState, updateModalState] = useState(false);

    const handleClick = () => 
    {
        if (hamburgerState == styles.close)
        {
            updateHamburgerState(styles.open);//change the "X" icon back to hamburger
            updateModalState(true);//open menu dialog
        }else
        {
            updateModalState(false);//close menu dialog
            updateHamburgerState(styles.close);//change hamburger to "X" icon
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
            {/* Desktop Nav Bar */}
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

            {/* Mobile Pop-up */}
            <div onClick={handleClick} className={`${styles.mobileNav} ${hamburgerState}`} >
                <div className={styles.hamburger}></div>
                <Modal open={modalState} >
                    {links && links.map((link) => {
                        return (
                            <Link key={link.id} to={link.path}>{link.text}</Link>
                        )
                    })}
                    {signIn && <SignInButton/>}
                    {createAccount && <CreateAccountButton/>}
                </Modal>                
            </div>
        </header>
     );
}
 
export default Header;