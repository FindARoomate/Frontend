import P from './../../ui/atoms/P/P';
import Img from './../../ui/atoms/Img/Img';
import H1 from './../../ui/atoms/Headings/H1/H1';
import Button from './../../ui/atoms/Button/Button';
import Header from '../../ui/organisms/Header/Header';
import styles from './OnboardingInstruction.module.css'
import { Link } from 'react-router-dom';

const OnboardingInstruction = ({title, description, img, url, linkText}) => {
    return ( 
        <div className={styles.onboardingBody}>
            <Header/>
            <div className={styles.onboardingContainer}>
                <div className={styles.onboarding}>
                    <H1>{title}</H1>
                    <Img src={img} />
                    <P>{description}</P>
                    <Link to={url}><Button>{linkText}</Button></Link>
                </div>
            </div>
        </div>
     );
}
 
export default OnboardingInstruction;