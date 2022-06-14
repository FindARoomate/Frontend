import globalStyles from './../../../globalStyles.module.css';
import styles from './NotificationListItem.module.css';
import { Link } from 'react-router-dom';
import Img from "../../atoms/Img/Img";
import P from '../../atoms/P/P';
import { DateTime } from 'luxon';

const NotificationListItem = ({dp, name, description, tag="", created_at, link="", is_read, id, handleClick}) =>
{
    const units = [
        'year',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
      ];
      
      const timeAgo = (date) => {
        let dateTime = DateTime.fromISO(date)
        const diff = dateTime.diffNow().shiftTo(...units);
        const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';
      
        const relativeFormatter = new Intl.RelativeTimeFormat('en', {
          numeric: 'auto',
        });
        console.log(Math.trunc(diff.as(unit)));
        return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
      };

    return ( 
            <div className={`${styles.listBox} ${is_read ? styles.openedListBox : styles.unopenedListBox }`}>
            <div className={styles.information}>
                <div className={styles.infoAndImage}>
                    <Img src={dp}/>
                    <span>
                        <span className={styles.nameAndTime}>
                            <P className={styles.name}>{name.slice(0,1).toUpperCase() + name.slice(1, name.length)}</P>

                            <div className={`${styles.time} ${globalStyles.mobileOnly}`}>2 hours ago</div>
                        </span>

                        <P className={styles.description}>
                            {description.slice(0, 40)+"..."}
                            <Link to={link} target="_blank" onClick={(e) => handleClick(e, id)}>View details</Link>
                        </P>
                    </span>
                </div>
                <div className={`${styles.time} ${globalStyles.desktopOnly}`}>
                    {DateTime.fromFormat(created_at, "y-MM-dd - HH:mm:ss").toRelative()}
                </div>
            </div>
        </div>        
    );
}
 
export default NotificationListItem;