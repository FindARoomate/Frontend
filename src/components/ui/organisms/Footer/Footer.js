import P from "../../atoms/P/P";
import styles from './Footer.module.css';
import IconList from './../../molecules/IconList/IconList';
import facebookIcon from './../../../../icons/facebook-icon.svg';
import instagramIcon from './../../../../icons/instagram-icon.svg';
import twitterIcon from './../../../../icons/twitter-icon.svg';
import linkedinIcon from './../../../../icons/linkedin-icon.svg';
import globalStyles from './../../../../components/globalStyles.module.css';

const Footer = () => {

    const icons = 
    [
        {
            key: 1,
            src: facebookIcon,
            name: "Facebook Icon",
            link: "https://web.facebook.com/Findaroommatecom-100316889345701",
        },
        {
            key: 2,
            src: instagramIcon,
            name: "Instagram Icon",
            link: "https://www.instagram.com/findaroommate_/"
        },
        {
            key: 3,
            src: twitterIcon,
            name: "Twitter Icon",
            link: "https://twitter.com/Findaroommate_"
        },
        {
            key: 4,
            src: linkedinIcon,
            name: "Linkedin Icon",
            link: "https://www.linkedin.com/in/findaroommate"
        }
    ]

    return ( 
        <div className= {`${globalStyles.body} ${styles.footerBody}`}>
            <div className={styles.footer}>
                <P>Connect with us on</P>
                
                <div className={styles.iconList}>
                    <IconList icons={icons}/>
                </div>

                <div className={styles.copyright}>
                    <P>GetARoommate.com © {new Date().getFullYear()}.</P>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;