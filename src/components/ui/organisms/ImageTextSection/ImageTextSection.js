import TextButtonGroup from "../../molecules/TextButtonGroup/TextButtonGroup";
import Img from './../../atoms/Img/Img';
import styles from './ImageTextSection.module.css';

const ImageTextSection = ({heading, description, button, img, order, customStyle}) => {
    return ( 
        <div
            className= {` ${styles.imageTextRow}
            ${order == "imageFirst" ? styles.imageFirst : styles.textFirst}`}
            style = {customStyle ? customStyle : {}}
        >
            <div className = {styles.textButtonGroup}>
                <TextButtonGroup
                    heading = {heading}
                    description = {description}
                    button = {button}
                />
            </div>
           
           <div className = {styles.img}>
            <Img 
                    src = {img.src}
                    customStyle= {img.customStyle}
                />
           </div>
                        
        </div>
     );
}
 
export default ImageTextSection;