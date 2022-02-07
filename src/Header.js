import logo from './images/logo.svg';
import contactIcon from './icons/contact-icon.svg';

const Header = () => {
    return ( 
        <header className="coming-soon-header">
                <div className="logo">
                    <img src={logo} alt="logo" class="logo"/>
                </div>
                <div className="contact-us">
                    <span>
                        <img src={contactIcon} alt="Contact Us Icon" />
                    </span>
                    <a href="#">Contact Us</a>
                </div>
            </header>
     );
}
 
export default Header;