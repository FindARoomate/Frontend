import styles from './Img.module.css';

const P = ({src, customStyle}) => 
{

    return ( 
        <img
        className={styles.img}
        style={customStyle}
        src = {src}
      />
     );

}
 
export default P;