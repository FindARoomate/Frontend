import styles from './H2.modules.css';

const H2 = ({children, customStyle}) => {
    return ( 
        <h2
        className = {styles.h2}
        style={customStyle}
        >
            {children}
        </h2>
     );
}
 
export default H2;