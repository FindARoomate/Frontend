import { useEffect, useRef } from "react";
import styles from './Modal.module.css';

const Modal = ({children, open, closeModal, customStyles}) =>
{
    const modalRef = useRef(null);
    
    
    useEffect(() => {
        const modalNode = modalRef.current;

        if(open)
        {
            modalNode.showModal();
        }else
        {
            modalNode.close();
        }
    }, [open]);

    const handleClose = () =>
    {
        closeModal();
    }

    return (
        <div>
             <dialog ref={modalRef} className={styles.modal} style={customStyles ? customStyles : {}}>
                 <div onClick={handleClose} className={styles.closeIcon}></div>
                 <div className={styles.modalChildren}>
                    {children}
                 </div>
            </dialog>
        </div>
    );
}
 
export default Modal;