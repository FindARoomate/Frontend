import Img from "../Img/Img";
import { useState } from "react";
import Input from "../Input/Input";
import styles from './FileInput.module.css';
import img from './../../../../icons/file-upload.svg';

const FileInput = ({name, handleFormChangeForFileInput, fileValue = null, ...rest}) => 
{
    const [labelText, setLabelText] = useState(null);

    // console.log(fileValue);

    if(fileValue)
    {
        setLabelText("A file already exists");
    }

    const handleOnChange = (e) => 
    {
        if(e.target.files.length > 1)
        {
            setLabelText(`${e.target.files.length} files selected`)
        }
        
        if(e.target.files.length == 1) 
        {
            setLabelText(e.target.files[0].name);
        }

        handleFormChangeForFileInput(name, e.target.files);
    }

    return ( 
        <div className={styles.fileInput}>
            <label htmlFor={name}>
                <Img src={img} />
                 {labelText ? labelText : (
                <span>Upload <br></br>a photo</span>
                    )}
            </label>
            <Input 
                    type="file"
                    name={name}
                    id={name}
                    onChange={handleOnChange}
                    {...rest}
                />
        </div>
     );
}
 
export default FileInput;