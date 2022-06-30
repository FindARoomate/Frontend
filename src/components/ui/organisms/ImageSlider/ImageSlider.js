import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import { Navigation, Pagination } from 'swiper';
import styles from './ImageSlider.module.css';
import Lightbox from 'react-image-lightbox';
import Img from '../../atoms/Img/Img';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const ImageSlider = ({images = []}) => 
{
    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const openLightBox = (index) => 
    {
        setIsLightBoxOpen(true);//open lightbox
        setPhotoIndex(index);
    }

    return ( 
        <div className={styles.imageContainer}>
            <Swiper
                navigation={true}
                pagination={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((imageLink, index) => 
                {
                    return (
                    <SwiperSlide key={uuidv4()}>
                        <Img 
                            src={imageLink.image_url}
                            onClick = {() => openLightBox(index)}
                        />
                    </SwiperSlide>
                    )
                    
                })
                }
                   
            </Swiper>
                {isLightBoxOpen && (
                <Lightbox
                    mainSrc={images[photoIndex].image_url}
                    nextSrc={images[(photoIndex + 1) % images.length].image_url}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length].image_url}
                    onCloseRequest={() => setIsLightBoxOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex) => 
                        {
                            return (photoIndex + images.length - 1) % images.length;

                        })
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex) => 
                        {
                            return (photoIndex + 1) % images.length;
                        })
                    }
                />
                    )
                    }
        </div>
     );
}
 
export default ImageSlider;