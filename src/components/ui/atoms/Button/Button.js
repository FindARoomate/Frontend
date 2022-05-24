import styles from './Button.module.css';

const Button = ({customStyle, children, handleOnClick, ...rest}) => 
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
            {...rest}
         >{children}</button>
     );
}
 
export default Button;