import logo from './images/logo.svg';
import {Link} from 'react-router-dom';
import mobileContactIcon from './icons/mobile-contact-icon.svg';
import desktopContactIcon from './icons/desktop-contact-icon.svg';

const ComingSoonHeader = () => {

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

                <Link to="/contact" style={linkStyle}>
                    <div className="contact-us">
                        <span>
                            <img src={mobileContactIcon} alt="Contact Us Icon" className="icon mobile-icon" />
                            <img src={desktopContactIcon} alt="Contact Us Icon" className="icon desktop-icon" />
                        </span>
                        <span>Contact Us</span>
                    </div>
                </Link>

            </header>
     );
}
 
export default ComingSoonHeader;