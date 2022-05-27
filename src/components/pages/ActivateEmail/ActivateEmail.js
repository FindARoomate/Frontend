import { useState } from 'react';
import P from '../../ui/atoms/P/P';
import Img from '../../ui/atoms/Img/Img';
import { CONFIRM_EMAIL } from '../../routes';
import H1 from '../../ui/atoms/Headings/H1/H1';
import styles from './ActivateEmail.module.css';
import useGet from '../../../customHooks/useGet';
import Button from '../../ui/atoms/Button/Button';
import { Link, useParams } from 'react-router-dom';
import Header from '../../ui/organisms/Header/Header';
import globalStyles from './../../globalStyles.module.css';
import mailConfirmedIcon from './../../../icons/mail-confirmed.svg';
import SignInDialog from '../../ui/organisms/Auth/SignIn/SignInDialog';
import invalidLinkIcon from './../../../icons/invalid-activation-link.svg';
import CreateAccountDialog from '../../ui/organisms/Auth/CreateAccount/CreateAccountDialog';

const ActivateEmail = () => 
{
    // auth/activate/MTM/b5ve6p-98bd6957a2360ef51fae67d347c609a9
    const {uid} = useParams();
    const {token} = useParams();
    const url = CONFIRM_EMAIL + uid + "/" + token;
    const {isError, isSuccess, APIData} = useGet(url);

    console.log(APIData);   

    // For sign in modal
    const [signInModalState, setSignInModalState] = useState(false);
    const showSignInDialog = () => setSignInModalState(true);
    const closeSignInModal = () => setSignInModalState(false);

    //For create account modal
    const [createAccountModalState, setCreateAccountModalState] = useState(false);
    const showCreateAccountDialog = () => setCreateAccountModalState(true);
    const closeCreateAccountModal = () => setCreateAccountModalState(false);


    const openSignInModal = () => 
    {
        closeCreateAccountModal();
        showSignInDialog();
    }

    const openCreateAccountModal = () => 
    {
        closeSignInModal();
        showCreateAccountDialog();
    }

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
                                <Button handleOnClick={openSignInModal}>Log in to my account</Button>
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

                <SignInDialog 
                    open={signInModalState} 
                    closeModal={closeSignInModal}
                    openCreateAccountModal={openCreateAccountModal}
                />
                <CreateAccountDialog 
                    open={createAccountModalState}
                    closeModal={closeCreateAccountModal}
                    openSignInModal={openSignInModal}
                />
        </div>
     );
}
 
export default ActivateEmail;