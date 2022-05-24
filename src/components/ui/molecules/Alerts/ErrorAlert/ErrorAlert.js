import errorIcon from './../../../../../icons/error-icon.svg';
import styles from './ErrorAlert.module.css';
import Img from '../../../atoms/Img/Img';
import P from '../../../atoms/P/P';

const ErrorAlert = ({children}) => 
{
    
    return ( 
    <div className={styles.errorAlert}>
        <Img src={errorIcon}/>
        <P>{children}</P>
    </div>
     );
}
 
export default ErrorAlert;