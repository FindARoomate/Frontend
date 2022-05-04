import globalStyles from './../../../../components/globalStyles.module.css';
import Button from '../../../ui/atoms/Button/Button';
import styles from './CreateProfileThankYouTemplate.module.css';
import H3 from '../../../ui/atoms/Headings/H3/H3';
import image from './../../../../images/create-profile-success-image.svg'
import Img from './../../../ui/atoms/Img/Img';
import Header from './../../../ui/organisms/Header/Header';
import { Link } from 'react-router-dom';

const CreateProfileThankYouTemplate = () => 
{
    return (  
    <div>
        <Header/>
        <div className= {`${globalStyles.body}`}>
            <div className={styles.thankYou}>
                <Img src={image}/>
                <div className={styles.heading}>
                    <H3>You have successfully created your profile.</H3>
                    <H3>You can now proceed to creating a roommate request!</H3>
                </div>
                <div className={styles.button}>
                    <Link to="/create-roommate-request-instruction">
                        <Button>Create a roommate request now!</Button>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Button>Return to dashboard</Button>
                </div>
            </div>
        </div>
    </div>

    );
}
 
export default CreateProfileThankYouTemplate;