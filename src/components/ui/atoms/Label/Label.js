import styles from './Label.modules.css';

const Label = (children) => {
    return ( 
        <label
        className={styles.label}
        >{children}</label>
     );
}
 
export default Label;