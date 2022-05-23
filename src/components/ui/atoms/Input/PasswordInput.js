import { useState } from 'react';
import Input from './Input.js';
import openedEyeIcon from './../../../../icons/opened-eye-icon.svg';
import closedEyeIcon from './../../../../icons/closed-eye-icon.svg';
import Img from './../Img/Img';
import styles from './PasswordInput.module.css';

const PasswordInput = (name, ...rest) => 
{
    const [passwordIcon, setPasswordIcon] = useState(closedEyeIcon);
    const [inputType, setInputType] = useState("password");
    
    const handleOnClick = () => 
    {
        // Reveal password
       if(inputType==="password")
       {
            setPasswordIcon(openedEyeIcon); //change icon
            setInputType("text");//reveal the password
       }else 
       {
            setPasswordIcon(closedEyeIcon); //change icon
            setInputType("password");//hide the password
       } 

    } 


    return ( 
        <span className={styles.passwordInput}>
            <Input 
                type={inputType}
                {...rest}
                name={name}
            />
            <Img onClick={handleOnClick} src={passwordIcon}/>
        </span>
     );
}
 
export default PasswordInput;