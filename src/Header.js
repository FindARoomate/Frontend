import logo from './images/logo.svg';
import {Link} from 'react-router-dom';
import mobileContactIcon from './icons/mobile-contact-icon.svg';
import desktopContactIcon from './icons/desktop-contact-icon.svg';

const Header = () => {

    const linkStyle = 
    {
        cursor: 'pointer'
    }
    return ( 
        <header className="coming-soon-header">

            <Link to="/" style={linkStyle}>
                <div className="logo">
                    <img src={logo} alt="logo" className="logo"/>
                </div>
            </Link>
            </header>
     );
}
 
export default Header;