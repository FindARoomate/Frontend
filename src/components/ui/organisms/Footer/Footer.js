import P from "../../atoms/P/P";
import styles from './Footer.module.css';
import IconList from './../../molecules/IconList/IconList';
import facebookIcon from './../../../../icons/facebook-icon.svg';
import instagramIcon from './../../../../icons/instagram-icon.svg';
import twitterIcon from './../../../../icons/twitter-icon.svg';
import linkedinIcon from './../../../../icons/linkedin-icon.svg';
import globalStyles from './../../../../components/globalStyles.module.css';

const Footer = () => {

    const paragraphStyle = 
    {
        fontSize: "28px",
        color: "#0029DD",
        fontWeight: "600",
        marginBottom: "25px"
    }

    const icons = 
    [
        {
            key: 1,
            src: facebookIcon,
            name: "Facebook Icon"
        },
        {
            key: 2,
            src: instagramIcon,
            name: "Instagram Icon"
        },
        {
            key: 3,
            src: twitterIcon,
            name: "Twitter Icon"
        },
        {
            key: 4,
            src: linkedinIcon,
            name: "Linkedin Icon"
        }
    ]

    return ( 
        <div className= {`${globalStyles.body} ${styles.footerBody}`}>
            
            <P customStyle = {paragraphStyle}>Connect with us on</P>
            
            <div className={styles.iconList}>
                <IconList icons={icons}/>
            </div>

            <div className={styles.copyright}>
                <P>Find a roommate.com © {new Date().getFullYear()}.</P>
            </div>
        </div>
     );
}
 
export default Footer;