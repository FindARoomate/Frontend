import styles from './P.module.css';

const P = ({children, type = null, customStyle}) => 
{
    const style = {};
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

    //update text color if custom color is set by user
    type && setColorForType(type);

    return ( 
        <p
        className={styles.p}
        style={customStyle ? customStyle : style}
        >
            {children}
        </p>
     );
}
 
export default P;