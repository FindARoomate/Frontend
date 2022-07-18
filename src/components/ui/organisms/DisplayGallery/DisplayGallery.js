import { v4 as uuidv4 } from 'uuid';
import Gallery from "react-photo-gallery";
import Lightbox from 'react-image-lightbox';
import { useState, useCallback } from 'react';
import { getMeta } from "../../../../helperFunctions/getFileDimensions";

const DisplayGallery = ({request_images}) => 
{
    // The image array for image gallery
    const [imageGallery, setImageGallery] = useState([]);
    let [photoIndex, setPhotoIndex] = useState(0);
    let [isOpen, setIsOpen] = useState(false);

     // Formatting image information into an object the image gallery can use    
     const formatRequestImages = (request_images) => 
     {
         const getFileDimensions = async (image_url) =>
         {
             let img = await getMeta(image_url);  
             let width = img.width;
             let height = img.height;     
             setImageGallery((imageGallery) => 
             {
                 return [...imageGallery, {src: image_url, width: width, height: height}]
                 
             });
         }
 
         request_images.forEach((image) => 
         {
             <div key={uuidv4()}>
                 {getFileDimensions(image.image_url)};
             </div>
         });
     }
     

         // Initializing the lightbox
    const openLightBox = useCallback((event, { photo, index }) => 
    {
        setPhotoIndex(index);
        setIsOpen(true);

    }, []);


    useState(() => 
    {
        if(imageGallery.length<=0) 
        {
            formatRequestImages(request_images);
        }
    }, [imageGallery]);

    return ( 
        <>
            <Gallery photos={imageGallery} onClick={openLightBox}/>
            {isOpen && (
                <Lightbox
                    mainSrc={imageGallery[photoIndex].src}
                    nextSrc={imageGallery[(photoIndex + 1) % imageGallery.length].src}
                    prevSrc={imageGallery[(photoIndex + imageGallery.length - 1) % imageGallery.length].src}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex) => 
                        {
                            return (photoIndex + imageGallery.length - 1) % imageGallery.length;

                        })
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex) => 
                        {
                            return (photoIndex + 1) % imageGallery.length;
                        })
                    }
                />
                )
            }
        </>
     );
}
 
export default DisplayGallery;