import styles from './ContactTag.module.css';

const ContactTag = ({icon, name, value}) => {
    return ( 
        <div className={styles.contactTag}>
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