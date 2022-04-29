import P from "../../atoms/P/P";
import styles from "./WaitlistSuccessMessage.module.css";

const WaitlistSuccessMessage = () => {
    return ( 
        <div className={styles.waitlist}>
            <div className={styles.heading}><P>You've successfully joined our waitlist</P></div>
            <div className={styles.subheading}><P>You'll be the first to know when we launch</P></div>
        </div>
     );
}
 
export default WaitlistSuccessMessage;