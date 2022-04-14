import logo from './../../../../images/logo.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({customStyle}) => {

    return ( 
        <header className={styles.header}
        style = {customStyle ? customStyle : {}}>
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="logo" className="logo"/>
                </div>
            </Link>
        </header>
     );
}
 
export default Header;