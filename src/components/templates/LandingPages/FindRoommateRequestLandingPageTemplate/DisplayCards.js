import P from "../../../ui/atoms/P/P";
import Card from "../../../ui/organisms/Card/Card";
import styles from './DisplayCards.module.css';

const DisplayCards = ({pagination}) => {
    return ( 
        <div className={styles.displayCardContainer}>
            <div className={styles.topSection}>
                <P>21 results</P>
            </div>
            <div className={styles.displayCardBody}>
                <div className={styles.displayCards}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                {pagination && (
                     <div className={styles.bottom}>
                     <P>Pagination should be here</P>
                 </div>
                )}
               
            </div>
             
        </div>
       
     );
}
 
export default DisplayCards;