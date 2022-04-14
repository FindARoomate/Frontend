import Header from '../../ui/organisms/Header/Header';
import ComingSoonPageForm from '../../../components/ui/organisms/ComingSoonPageForm/ComingSoonPageForm';
import styles from './ComingSoonTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import H1 from './../../ui/atoms/Headings/H1/H1';
import P from './../../ui/atoms/P/P';
import Img from './../../ui/atoms/Img/Img';

const ComingSoon = ({headingText, subText, image}) => {
    return ( 
        <div className = {styles.comingSoon}>
            <Header/>
            <div className= {`${globalStyles.body} ${styles.comingSoonBody}`}>
                <div className={styles.comingSoonHero}>
                    <div className={styles.text}>
                        <H1>{headingText}</H1>
                        <P>{subText}</P>
                    </div>
                    
                    <div className={styles.comingSoonForm}>
                        <ComingSoonPageForm/>
                    </div>
                </div>
                <div className={`${styles.launchingSoonImage} ${globalStyles.desktopOnly}`}>
                    <Img 
                    src={image} 
                    customStyle=
                    {
                    {
                        height: "419.4054870605469px",
                        width: "417.29669189453125px"
                    }
                    }/>
                </div>
               
            </div>
        </div>
     );
}
 
export default ComingSoon;