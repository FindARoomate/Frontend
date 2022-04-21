import { useEffect, useRef } from "react";
import styles from './Modal.module.css';

const Modal = ({children, open}) =>
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
    }, [open])

    return (
        <div>
             <dialog ref={modalRef} className={styles.modal}>
                 <div className={styles.modalChildren}>
                    {children}
                 </div>
            </dialog>
        </div>
    );
}
 
export default Modal;