import EditImage from "../../molecules/EditImage/EditImage";
import {v4 as uuidv4} from "uuid";

const EditRommateRequestImages = ({images, removeImage}) => 
{
    return (
        images.map((image) => 
        {
            return <EditImage key={uuidv4()} src={image.image_url} image_id={image.id} removeImage={removeImage} />
        })
     );
}
 
export default EditRommateRequestImages;