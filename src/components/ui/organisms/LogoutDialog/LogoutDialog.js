import Button from '../../atoms/Button/Button';
import P from '../../atoms/P/P';
import Modal from '../Modal/Modal';
import styles from './LogoutDialog.module.css';

const LogoutDialog = ({open, closeModal}) => 
{
    return ( 
        <Modal 
            open={open} 
            closeModal={closeModal}
            customStyles={{
                padding: "40px 37px",
                width: "624px"
            }}
        >
            <div className={styles.logoutDialog}>
                <P>Are you sure you want to log out?</P>
                <span>
                    <Button>Yes, log me out</Button>
                    <Button className={styles.backButton} handleOnClick={closeModal}>No, go back</Button>
                </span>
            </div>
        </Modal>
     );
}
 
export default LogoutDialog;