import styles from './H3.modules.css';

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