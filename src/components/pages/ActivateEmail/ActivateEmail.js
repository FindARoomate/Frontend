import P from '../../ui/atoms/P/P';
import Img from '../../ui/atoms/Img/Img';
import { CONFIRM_EMAIL } from '../../routes';
import H1 from '../../ui/atoms/Headings/H1/H1';
import styles from './ActivateEmail.module.css';
import Button from '../../ui/atoms/Button/Button';
import Header from '../../ui/organisms/Header/Header';
import globalStyles from './../../globalStyles.module.css';
import mailConfirmedIcon from './../../../icons/mail-confirmed.svg';
import invalidLinkIcon from './../../../icons/invalid-activation-link.svg';
import { Link, useParams } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';

const ActivateEmail = () => 
{
    // auth/activate/MTM/b5ve6p-98bd6957a2360ef51fae67d347c609a9
    const {uid} = useParams();
    const {token} = useParams();

    const url = CONFIRM_EMAIL + uid + "/" + token;
    const {isError, isSuccess, APIData} = useGet(url);

    console.log(APIData);   

    return ( 
        <div className={styles.activateEmail}>
            <div className={styles.body}>
                <Header/>
                <div className={`${globalStyles.body} ${styles.content}`}>
                {!APIData ? <P>Loading...</P> : 
                <>
                    {isError && (
                        <div className={styles.error}>
                            <Img src={invalidLinkIcon}/>
                            <H1>Activation link is invalid!</H1>
                            <P>This means your email address has been already activated. You can now proceed to finding and connecting to your ideal roommate. </P>
                            <div className={styles.buttonGroup}>
                                <Link to="/"><Button>Log in to my account</Button></Link>
                                <Link to="/"><Button>Take me to GetARoommate.co</Button></Link>
                            </div>
                            
                        </div>
                    )}                
                    {isSuccess && (
                    <div className={styles.success}>
                        <Img src={mailConfirmedIcon}/>
                        <H1>Your email has been successfully activated!</H1>
                        <P>You can now proceed to finding and connecting to your ideal roommate.</P>
                        <Link to="/">
                            <Button>Take me to GetARoommate.co</Button>
                        </Link>
                    </div>
                )}
                </>}
                </div>
                </div>
        </div>
     );
}
 
export default ActivateEmail;