import errorIcon from './../../../../../icons/error-icon.svg';
import styles from './SuccessAlert.module.css';
import Img from '../../../atoms/Img/Img';
import P from '../../../atoms/P/P';

const SuccessAlert = ({message}) => {
    return ( 
        <div className={styles.successAlert}>
        
            {/* <Img 
                src={errorIcon}
                customStyle={{width:'20px', height: '20px', marginRight: '10px'}}
            /> */}
        <P>{message}</P>
    </div>
     );
}
 
export default SuccessAlert;