import Img from "../Img/Img";
import { useState } from "react";
import Input from "../Input/Input";
import styles from './FileInput.module.css';
import img from './../../../../icons/file-upload.svg';

const FileInput = ({name, handleFormInputChange, ...rest}) => 
{
    const [labelText, setLabelText] = useState(null);

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
        console.log(e.target.files);
        console.log(JSON.stringify(e.target.files));

        // handleFormInputChange(name, JSON.stringify(e.target.files));
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