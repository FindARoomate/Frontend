import styles from './ContactTag.module.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ContactTag = ({icon, name, value}) => 
{
    AOS.init();//intilize on scroll animation

    return ( 
        <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="1350"
            className={styles.contactTag}
        >
            <span className={styles.contactType}>
                <img src={icon} className={styles.mobileContactIcon}/>
                <p>{name}</p>
            </span>
            <span className={styles.contactContent}>
                {value}
            </span>
        </div>
     );
}
 
export default ContactTag;