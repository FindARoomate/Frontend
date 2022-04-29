import styles from './P.module.css';

const P = (props) => 
{
    const {children, customStyle, ...rest} = props;

    return ( 
        <p
        className={styles.p}
        style={customStyle}
        {...rest}
        >
            {children}
        </p>
     );
}
 
export default P;