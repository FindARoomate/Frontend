import Img from "../../atoms/Img/Img";
import styles from "./EditImage.module.css";

const EditImage = ({src, image_id, removeImage}) => 
{
    const handleClick = (e) => 
    {
        removeImage(image_id);
    }

    return (  
        <span className={styles.EditImage}>
            <span className={styles.iconContainer} onClick={handleClick}><span className={styles.icon}>+</span></span>
            <Img src={src} />
        </span>
     );
}
 
export default EditImage;