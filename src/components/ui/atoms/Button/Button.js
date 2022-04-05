import styles from './Button.module.css';

const Button = ({type = null, customStyle = null, children}) => 
{
        
    var style = {background: '#0029DD'};

    const setBackground = (color) => 
    {
        style.background = color;
    }

    const getStylesForType = (buttonType) => 
    {
        switch(buttonType)
        {
            case ('success'):
                setBackground('green');
                break;

            case ('danger'):
                setBackground('red');
                break;
        }
    }

    if(customStyle)
    {
        style = customStyle;
    }

    if(type)
    {
        getStylesForType(type);
    }

    return ( 
        <button
            className={styles.button}
            style={style}
         >{children}</button>
     );
}
 
export default Button;