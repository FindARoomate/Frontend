import styles from './ListBox.module.css';
import Img from "../../atoms/Img/Img";
import P from '../../atoms/P/P';
import forwardIcon from "../../../../icons/forward-icon.svg";


const ListBox = ({dp, name, description, tag}) =>
{
    return (  
        <div className={styles.listBox}>
            <div className={styles.information}>
                <Img src={dp}/>
                <span>
                    <P className={styles.name}>{name}</P>
                    <P className={styles.description}>{description.slice(0, 35)+"..."}</P>
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
                    (tag.toUpperCase() == "DECLINED" ) && (
                        <div className={`${styles.tag} ${styles.declined}`}>
                            Declined
                        </div>
                    )
                }

                {
                    (tag.toUpperCase() == "SUCCESS" ) && (
                        <div className={`${styles.tag} ${styles.success}`}>
                            Success
                        </div>
                    )
                }

                <div className={styles.icon}>
                    <Img src={forwardIcon} />
                </div>
            </div>
        </div>
    );
}
 
export default ListBox;