import Img from "../Img/Img";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from './FileInput.module.css';
import img from './../../../../icons/file-upload.svg';

const FileInput = ({name, fileValue = null, required=true, multiple=false, onChange, ...rest}) => 
{
    const [labelText, setLabelText] = useState("Upload a photo");
    const [isInputRequired, setIsInputRequired] = useState(required); 


    const handleOnChange = (e) => 
    {
        if(e.target.files.length > 1)
        {
            setLabelText(`${e.target.files.length} files selected`)
        }
        
        if(e.target.files.length === 1) 
        {
            setLabelText(e.target.files[0].name);
        }
       onChange(name, e.target.files);
    }

    useEffect(() => 
    {
        if(multiple)
        {
            setLabelText("Upload Photos");
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


    }, [fileValue, multiple])

    return ( 
        <div className={styles.fileInput}>
            <label htmlFor={name}>
                <Img src={img} />
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