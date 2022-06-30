import { useEffect, useRef, useCallback } from "react";
import styles from './Modal.module.css';

const Modal = ({children, open, closeModal, customStyles}) =>
{
    const modalRef = useRef(null);
    
    const escFunction = useCallback((event) => 
    {
        if (event.key === "Escape")   closeModal();

    }, []);

    useEffect(() => 
    {
        const modalNode = modalRef.current;

        (open) ? modalNode.showModal() : modalNode.close();

        document.addEventListener("keydown", escFunction, false);

        return () =>   document.removeEventListener("keydown", escFunction, false);
        
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