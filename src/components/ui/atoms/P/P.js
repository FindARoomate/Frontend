import styles from './P.modules.css';

const P = ({children, type = null, customStyle, align = null}) => 
{

    var style = 
    {
        color: '#000000',
        textAlign: 'left'
    };

    const setColorForType = (textType) => 
    {
        switch(textType)
        {
            case ('success'):
                style.color = 'green';
                break;

            case ('danger'):
                style.color = 'red';
                break;

            case ('primary'):
                style.color = '#0029DD';
                break;
        }
    }

    const setTextAlign = (textAlign) => 
    {
        switch(textAlign)
        {
            case ('left'):
                style.textAlign = 'left';
                break;

            case ('center'):
                style.textAlign = 'center';
                break;

            case ('right'):
                style.textAlign = 'right';
                break;
        }
    }

    //update style variable if customStyle variable exists
    style = customStyle ? customStyle : style;

    //update text color if custom color is set by user
    type && setColorForType(type);

    //update text align if set by user
    align && setTextAlign(align);

    return ( 
        <p
        className={styles.p}
        style={customStyle}
        >
            {children}
        </p>
     );
}
 
export default P;