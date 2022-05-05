import globalStyles from './../../../../components/globalStyles.module.css';
import Button from '../../../ui/atoms/Button/Button';
import styles from './CreateProfileThankYouTemplate.module.css';
import H3 from '../../../ui/atoms/Headings/H3/H3';
import Img from './../../../ui/atoms/Img/Img';
import Header from './../../../ui/organisms/Header/Header';
import { Link } from 'react-router-dom';

const CreateProfileThankYouTemplate = ({title, subtitle, link1, link2, image}) => 
{
    return (  
    <div>
        <Header/>
        <div className= {`${globalStyles.body}`}>
            <div className={styles.thankYou}>
                <Img src={image}/>
                <div className={styles.heading}>
                    <H3>{title}</H3>
                    {subtitle ? (<H3>{subtitle}</H3>) : ""}
                </div>
                <div className={styles.button}>
                    <Link to={link1.link}>
                        <Button>{link1.text}</Button>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link to={link2.link}>
                        <Button>{link2.text}</Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    );
}
 
export default CreateProfileThankYouTemplate;