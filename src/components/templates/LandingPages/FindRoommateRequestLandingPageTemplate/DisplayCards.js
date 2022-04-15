import Card from "../../../ui/organisms/Card/Card";
import styles from './DisplayCards.module.css';

const DisplayCards = () => {
    return ( 
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
     );
}
 
export default DisplayCards;