import styles from './Img.module.css';

const Img = (props) => 
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
 
export default Img;