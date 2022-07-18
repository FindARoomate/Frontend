import Img from "../Img/Img";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from './FileInput.module.css';
import img from './../../../../icons/file-upload.svg';

const FileInput = ({name, fileValue = null, fileLabel=null, iconImg=img, required=true, multiple=false, onChange, ...rest}) => 
{
    const [labelText, setLabelText] = useState(fileLabel);
    const [isInputRequired, setIsInputRequired] = useState(required); 

    const handleOnChange = (e) => 
    {        
        onChange(name, e.target.files);
        if(e.target.files.length > 1)
        {
            setLabelText(`${e.target.files.length} files selected`)
        }
        
        if(e.target.files.length === 1) 
        {
            setLabelText(e.target.files[0].name);
        }

    }

    useEffect(() => 
    {   
        if(!labelText)
        {
            if(multiple)
            {
                setLabelText("Select photos");
            }else 
            {
                setLabelText("Select a photo");
            }
        }

        if(fileValue)
        {
            setIsInputRequired(false);

            if(fileValue.length == 1)
            {
                setLabelText(fileValue[0].name);
            }else 
            {
                setLabelText(`${fileValue.length} files selected`);
            }
        }

    }, [fileValue, fileLabel, multiple, labelText])

    return ( 
        <div className={styles.fileInput}>
            <label htmlFor={name}>
                <Img src={iconImg} />
                <span>{labelText}</span>
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
 
export default FileInput;