import P from "../../atoms/P/P";
import Button from "../../atoms/Button/Button";
import Img from "../../atoms/Img/Img";
import db from "./../../../../images/card-display-picture.jpg";
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

const Card = () => {

    const img =(
        <Img src={db} 
        customStyle=
        {
            {
                width: "100%", 
                maxHeight: "264px",
                borderRadius: "8px 8px 0px 0px"
            }
        }
    />
    );
           

    return ( 

        <div className={styles.card}>
            <div className={styles.top}>
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>{img}</SwiperSlide>
                    <SwiperSlide>{img}</SwiperSlide>
                    <SwiperSlide>{img}</SwiperSlide>
                    <SwiperSlide>{img}</SwiperSlide>
                </Swiper>
            </div>
            <div className={styles.bottom}>
                {/* Image title */}
                <span className={styles.imageTitle}> 
                    <Img src={db} customStyle={{width: "27px", height: "27px", borderRadius: "50%"}}/>
                    <P>Precious Fasoyesan</P>
                </span>
                <div className={styles.description}>
                    <P>Female roommate needed in a self contain at Agbowo... 
                        <Link to="/">More info</Link>
                    </P>
                </div>
                <Button>Connect now</Button>
            </div>
        </div>
     );
}
 
export default Card;