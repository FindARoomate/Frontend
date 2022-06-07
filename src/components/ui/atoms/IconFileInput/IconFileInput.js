import Img from "../Img/Img";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from './IconFileInput.module.css';
import img from './../../../../icons/add-image-icon.svg';

const IconFileInput = ({name, fileValue = null, required=true, multiple=false, onChange, getImages, ...rest}) => 
{
    const [isInputRequired, setIsInputRequired] = useState(required); 

    const handleOnChange = (e) => 
    {
       onChange(name, e.target.files);
       getImages(e.target.files);
    }

    useEffect(() => 
    {
        if(fileValue)
        {
            setIsInputRequired(false);
        }


    }, [fileValue, multiple])

    return ( 
        <div className={styles.fileInput}>
            <label htmlFor={name}>
                <Img src={img} />
            </label>
            <Input 
                    type="file"
                    name={name}
                    id={name}
                    onChange={handleOnChange}
                    required={isInputRequired}
                    multiple={multiple}
                    {...rest}
                />
        </div>
     );
}
 
export default IconFileInput;