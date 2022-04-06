import styles from './P.module.css';

const P = ({children, customStyle}) => 
{
    return ( 
        <p
        className={styles.p}
        style={customStyle}
        >
            {children}
        </p>
     );
}
 
export default P;