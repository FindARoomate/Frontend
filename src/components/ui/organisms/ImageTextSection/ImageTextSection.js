import TextButtonGroup from "../../molecules/TextButtonGroup/TextButtonGroup";
import Img from './../../atoms/Img/Img';
import styles from './ImageTextSection.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ImageTextSection = ({heading, description, button, img, order, customStyle}) =>
{
    AOS.init();//intilize on scroll animation

    let imageAnimation;

    if(order == "imageFirst")
    {
        imageAnimation = "fade-right";
    }else
    {
        imageAnimation = "fade-left";
    }

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
                    data-aos = {imageAnimation}
                    data-aos-duration="1500"
                    data-aos-offset="150"
                />
           </div>
                        
        </div>
     );
}
 
export default ImageTextSection;