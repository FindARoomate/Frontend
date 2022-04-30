import { Link } from 'react-router-dom';
import Img from './../../atoms/Img/Img';

const IconList = ({icons}) => 
{
    return ( 
        icons.map((icon) => {
            return ( 
            <a key={icon.key} href={icon.link}>
                <Img src = {icon.src}/>
            </a>
            )
        })
     );
}
 
export default IconList;