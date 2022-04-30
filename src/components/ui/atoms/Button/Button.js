import styles from './Button.module.css';

const Button = ({customStyle, children, handleOnClick}) => 
{

    const handleButtonClick = () => 
    {
        if(handleOnClick)
        {
            handleOnClick();
        }
    }
    return ( 
        <button
            className={styles.button}
            style={customStyle}
            onClick = {handleButtonClick}
         >{children}</button>
     );
}
 
export default Button;