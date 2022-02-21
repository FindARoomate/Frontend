import {Link} from 'react-router-dom';

const Button = (props) => {
    return ( 
        <Link to={props.link}>
            <button>{props.children}</button>
        </Link>
     );
}
 
export default Button;