import styles from './Img.module.css';

const P = (props) => 
{
  const {src, customStyle, ...rest} = props
    return ( 
        <img
        className={styles.img}
        style={customStyle}
        src = {src}
        {...rest}
      />
     );

}
 
export default P;