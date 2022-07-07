import Img from "../Img/Img";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import styles from './FileInput.module.css';
import img from './../../../../icons/file-upload.svg';

const FileInput = ({name, fileValue = null, fileLabel="Upload a photo", iconImg=img, required=true, multiple=false, onChange, ...rest}) => 
{
    const [labelText, setLabelText] = useState(fileLabel);
    const [isInputRequired, setIsInputRequired] = useState(required); 
    const [fileData, setFileData] = useState([]);

    // When you click a form input, it clears the selected files
    // This is to revert the text back to "Upload a photo" or "Upload photos" when the input is clicked
    const handleOnClick = () => 
    {
        (multiple && !fileLabel) ? setLabelText("Upload Photos") : setLabelText(fileLabel);
    }

    const handleOnChange = (e) => 
    {
        setFileData(e.target.files);

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
        if(Object.values(fileData).length > 0) 
        { 
            onChange(name, fileData);
        }

        (multiple && !fileLabel) ? setLabelText("Upload Photos") : setLabelText(fileLabel);

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

    }, [fileData, fileValue, multiple])

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
                onClick={handleOnClick}
                required={isInputRequired}
                multiple={multiple}
                {...rest}
            />
        </div>
     );
}
 
export default FileInput;