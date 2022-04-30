import styles from './H2.module.css';

const H2 = (props) =>
{
    const {children, customStyle, ...rest} = props
    return ( 
        <h2
        className = {styles.h2}
        style={customStyle}
        {...rest}
        >
            {children}
        </h2>
     );
}
 
export default H2;