import Img from './../../atoms/Img/Img';

const IconList = ({icons}) => 
{
    return ( 
        icons.map((icon) => {
            return ( <Img key={icon.key} src = {icon.src}/>)
        })
     );
}
 
export default IconList;