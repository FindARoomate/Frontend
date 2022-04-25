import H1 from './../../ui/atoms/Headings/H1/H1';
import styles from './CreatePersonalProfileTemplate.module.css';
import Modal from './../../ui/organisms/Modal/Modal';
import { useState } from 'react';

const CreatePersonalProfileTemplate = ({children, navClasses}) => {

    // Create Account Menu Dialog Box controls
    const [createPersonalProfileModalState, updateCreatePersonalProfileModalState] = useState(true);
    // const openCreateAccountDialog = () => 
    // {
    //     updateModalState(false); //close mobile menu dialog
    //     updateSignInModalState(false);//close sign in menu dialog
    //     updateCreateAccountModalState(true); //open create account dialog
    // }
    const closeCreateAccountDialog = () => 
    {
        updateCreatePersonalProfileModalState(false);
    }

    return ( 
        <Modal open={createPersonalProfileModalState} closeModal={closeCreateAccountDialog}>
            <div className={styles.personalProfile}>
            <H1>CREATE PERSONAL PROFILE</H1>
            <div className={styles.formNavigationContainer}>
                <div className={styles.formNavigation}>
                    <div className={`${navClasses[0]} ${styles.singleNav}`}>
                        <span className={styles.number}>1</span>
                        <span className={styles.text}>Biodata</span>
                    </div>
                    <div className={`${navClasses[1]} ${styles.singleNav}`}>
                        <span className={styles.number}>2</span>
                        <span className={styles.text}>Tell us about yourself</span>
                    </div>
                    <div className={`${navClasses[2]} ${styles.singleNav}`}>
                        <span className={styles.number}>3</span>
                        <span className={styles.text}>Define your ideal roommate</span>
                    </div>
                </div>
                <div className={styles.formNavigationDivider}></div>
            </div>
            {children}
            </div>
        </Modal>
       
     );
}
 
export default CreatePersonalProfileTemplate;