import styles from './ListBox.module.css';
import Img from "../../atoms/Img/Img";
import P from '../../atoms/P/P';
import forwardIcon from "../../../../icons/forward-icon.svg";
import { Link } from 'react-router-dom';

const ListBox = ({dp, name, description, tag="", link=""}) =>
{
    return ( 
        <Link to={link}>
            <div className={styles.listBox}>
            <div className={styles.information}>
                {dp && <Img src={dp}/>}
                <span>
                    <P className={styles.name}>{name}</P>
                    <P className={styles.description}>{description.length <= 32 ? description : description.slice(0, 35)+"..."}</P>
                </span>
            </div>
            <div className={styles.tagAndIcon}>
                {
                    (tag.toUpperCase() == "PENDING" ) && (
                        <div className={`${styles.tag} ${styles.pending}`}>
                            Pending
                        </div>
                    )
                }

                {
                    (tag.toUpperCase() == "REJECTED" ) && (
                        <div className={`${styles.tag} ${styles.declined}`}>
                            Declined
                        </div>
                    )
                }

                {
                    (tag.toUpperCase() == "ACCEPTED" ) && (
                        <div className={`${styles.tag} ${styles.success}`}>
                            Accepted
                        </div>
                    )
                }

                <div className={styles.icon}>
                    <Img src={forwardIcon} />
                </div>
            </div>
        </div>
        </Link> 
        
    );
}
 
export default ListBox;