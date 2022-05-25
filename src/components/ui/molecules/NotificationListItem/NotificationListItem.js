import globalStyles from './../../../globalStyles.module.css';
import styles from './NotificationListItem.module.css';
import { Link } from 'react-router-dom';
import Img from "../../atoms/Img/Img";
import P from '../../atoms/P/P';

const NotificationListItem = ({dp, name, description, tag="", link=""}) =>
{
    return ( 
            <div className={styles.listBox}>
            <div className={styles.information}>
                <div className={styles.infoAndImage}>
                    <Img src={dp}/>
                    <span>
                        <span className={styles.nameAndTime}>
                            <P className={styles.name}>{name}</P>
                            <div className={`${styles.time} ${globalStyles.mobileOnly}`}>2 hours ago</div>
                        </span>

                        <P className={styles.description}>
                            {description.slice(0, 40)+"..."}
                            <Link to={link}>View details</Link>
                        </P>
                    </span>
                </div>
                <div className={`${styles.time} ${globalStyles.desktopOnly}`}>
                    2 hours ago
                </div>
            </div>
        </div>        
    );
}
 
export default NotificationListItem;