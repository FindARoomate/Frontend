import styles from './Label.module.css';

const Label = ({children, ...rest}) => {
    return ( 
        <label
        className={styles.label}
        {...rest}
        >{children}</label>
     );
}
 
export default Label;