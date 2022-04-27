import H1 from './../../ui/atoms/Headings/H1/H1';
import styles from './CreatePersonalProfileTemplate.module.css';
import Header from '../../ui/organisms/Header/Header';
const CreatePersonalProfileTemplate = ({children, navClasses}) => 
{

    return (
        <div className={styles.personalProfileContainer}>
            <Header/>
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
        </div> 
     );
}
 
export default CreatePersonalProfileTemplate;