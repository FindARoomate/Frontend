import styles from './H1.module.css';

const H1 = (props) => 
{
    const {children, customStyle, ...rest} = props;

    return ( 
        <h1
        className={styles.h1}
        style={customStyle ? customStyle : {}}
        {...rest}
        >{children}</h1>
     );
}
 
export default H1;