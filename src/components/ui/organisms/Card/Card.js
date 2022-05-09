import P from "../../atoms/P/P";
import Button from "../../atoms/Button/Button";
import Img from "../../atoms/Img/Img";
import styles from './Card.module.css';
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./sliderStyles.css";


// import required modules
import { Navigation, Pagination } from "swiper";

import { v4 as uuidv4 } from 'uuid';


const Card = ({ownerName, title, moreInfoLink, sliderImages, thumbnail}) => {

const imgCustomStyle = 
{
    width: "100%", 
    maxHeight: "264px",
    borderRadius: "16px 16px 0px 0px"
}
        
    return ( 

        <div className={styles.card}>
            <div className={styles.top}>
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        sliderImages && sliderImages.map((imageLink) => 
                        {
                            return (
                            <SwiperSlide key={uuidv4()}>
                                <Img 
                                    src={imageLink}
                                    customStyle = {imgCustomStyle}
                                />
                            </SwiperSlide>
                            )
                           
                        })
                    }
                   
                </Swiper>
            </div>
            <div className={styles.bottom}>
                {/* Image title */}
                <span className={styles.imageTitle}> 
                    <Img src={thumbnail} customStyle={{width: "27px", height: "27px", borderRadius: "50%"}}/>
                    <P>{ownerName}</P>
                </span>
                <div className={styles.description}>
                    <P>{title ? title.substr(0, 50) + "... " : ""}
                        <Link to={moreInfoLink}>More info</Link>
                    </P>
                </div>
                <Button>Connect now</Button>
            </div>
        </div>
     );
}
 
export default Card;