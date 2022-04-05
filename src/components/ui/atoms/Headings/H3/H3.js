import styles from './H3.module.css';

const H3 = ({children, customStyle}) => {
    return ( 
        <h3
        className = {styles.h3}
        style={customStyle}
        >
            {children}
        </h3>
     );
}
 
export default H3;