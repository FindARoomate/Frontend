import styles from './H3.module.css';

const H3 = (props) =>
{
    const {children, customStyle, ...rest} = props;

    return ( 
        <h3
        className = {styles.h3}
        style={customStyle}
        {...rest}
        >
            {children}
        </h3>
     );
}
 
export default H3;