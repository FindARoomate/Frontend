import logo from './../../../../images/logo.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import SignInButton from '../../atoms/Button/SignInButton';
import CreateAccountButton from '../../atoms/Button/CreateAccountButton';

const Header = ({customStyle, signIn, createAccount, links}) => {

    return ( 
        <header className={styles.header}
        style = {customStyle ? customStyle : {}}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            <div className={styles.nav}>

                {/* Get all links */}

                {links && links.map((link) => {
                    return (
                        <Link key={link.id} to={link.path}>{link.text}</Link>
                    )
                })}
                {signIn && <SignInButton/>}
                {createAccount && <CreateAccountButton/>}
            </div>
        </header>
     );
}
 
export default Header;