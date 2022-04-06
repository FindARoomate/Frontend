import styles from './Button.module.css';

const Button = ({customStyle, children}) => 
{
    return ( 
        <button
            className={styles.button}
            style={customStyle}
         >{children}</button>
     );
}
 
export default Button;