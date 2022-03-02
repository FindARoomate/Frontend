import {Link} from 'react-router-dom';

const Button = (props) => {
    return ( 
        <Link to={props.link}>
            <button onClick={props.clicked}>{props.children}</button>
        </Link>
     );
}
 
export default Button;