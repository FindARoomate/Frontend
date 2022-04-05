import errorIcon from './../../../../../icons/error-icon.svg';
import P from '../../../atoms/P/P';
import Img from '../../../atoms/Img/Img';

const ErrorAlert = ({message}) => {
    return ( 
    <div>
        <P
            customStyle={{color: '#ED1E2E'}}
        >
            <Img 
                src={errorIcon}
                customStyle={{width:'20px', height: '20px', marginRight: '10px'}}
            />
            {message}
        </P>
    </div>
     );
}
 
export default ErrorAlert;