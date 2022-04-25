import styles from './H1.module.css';

const H1 = ({children, customStyle}) => 
{
    return ( 
        <h1
        className={styles.h1}
        style={customStyle ? customStyle : {}}
        >{children}</h1>
     );
}
 
export default H1;