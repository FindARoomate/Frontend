import errorIcon from './../../../../../icons/error-icon.svg';
import styles from './ErrorAlert.module.css';
import Img from '../../../atoms/Img/Img';
import P from '../../../atoms/P/P';

const ErrorAlert = ({message}) => 
{
    
    return ( 
    <div className={styles.errorAlert}>
        <Img src={errorIcon}/>
        <P>{message}</P>
    </div>
     );
}
 
export default ErrorAlert;