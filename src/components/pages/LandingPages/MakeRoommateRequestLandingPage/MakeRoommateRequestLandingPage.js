import MakeRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/MakeRoommateRequestLandingPageTemplate/MakeRoommateRequestLandingPageTemplate';
import heroImage from './../../../../images/make-roommate-request-landing-page-hero-image.svg';
import styles from './MakeRoommateRequestLandingPage.module.css';
import createProfileImage from './../../../../images/create-profile-section.svg';
import makeRoommateRequestImage from './../../../../images/make-roomate-request-section.svg';
import acceptRoommateConnection from './../../../../images/accept-roommate-connection-section.svg';
import H1 from '../../../ui/atoms/Headings/H1/H1';
import H3 from '../../../ui/atoms/Headings/H3/H3';
import P from '../../../ui/atoms/P/P';
import Button from '../../../ui/atoms/Button/Button';
import SignInDialog from '../../../ui/organisms/Auth/SignIn/SignInDialog';
import CreateAccountDialog from '../../../ui/organisms/Auth/CreateAccount/CreateAccountDialog';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context';

const MakeRoommateRequestLandingPage = () => 
{

    const {isUserLoggedIn} = useContext(UserContext);

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

    //For how it works section
    var customStyle = {alignItems: "center"}

    // Hero Section
    var heading =  <H1>Find the perfect roommates...</H1>
    var description = <P> A platform to allow people to connect with potential roommates</P>
    // var button =  <Link to="/dashboard"><Button>Get Started</Button></Link> 
    var button = <div style={{display:"flex", flexWrap: "noWrap", flexDirection: "row", gap: "24px"}}>
                    <Link to="/view-requests"><Button customStyle={{fontWeight: "500"}}>Explore Listings</Button></Link>
                    <Button customStyle={{background: "transparent", fontWeight: "500", color: "#0029DD", border: "1px solid #0029DD"}} handleOnClick={showSignInDialog}>Sign Up</Button>
                </div>
    var img = {src: heroImage}
    var order = "textFirst"
    const heroSection = {heading, description, button, img, order}

    // Create Profile Section
    var heading = <H3>1. Create your <span style={{color: "#0029DD"}}>profile</span></H3>;
    var description = <P>What type of person are you? Create a profile and tell us about it. Then, tell us 
        the kind of person you would want for a roommate.</P>;
    var button = <Button handleOnClick={showSignInDialog}>{"Create your profile now. >>"}</Button>
    var img = {src: createProfileImage}
    var order = "imageFirst"
    const createProfile = {heading, description, button, img, order, customStyle}

    // Make Roommate Section
    var heading = <H3>2. Make a roommate <span style={{color: "#0029DD"}}>request</span></H3>
    var description = <P>Request for a roommate. Provide us with some information. We’ll match your request 
        with simliar requests and notify you when we find the ideal roommate for you.</P>;
    var button = <Button handleOnClick={showSignInDialog}>{"Start now. >>"}</Button>
    var img = {src: makeRoommateRequestImage}
    var order = "textFirst"
    const makeRoommateRequest = {heading, description, button, img, order, customStyle}

    // Accept Connection Section
    var heading =  <H3>3. <span style={{color: "#0029DD"}}>Connect</span> to your roommate</H3>
    var description = <P>When you accept a roommate request, we’ll provide you with the 
        contact details of your roommie and you get to talk off the app.</P>;

    var button = <Button handleOnClick={showSignInDialog}>{"Get Started. >>"}</Button>
    var img = {src: acceptRoommateConnection}
    var order = "imageFirst"
    const acceptConnection = {heading, description, button, img, order, customStyle}
    

    // CTA Section
    var heading = <H3 >Getting an ideal roommate doesn't have to be stressful.<br></br>Allow <Link to="/" style={{color: "#0029DD"}}>GetARoommate.co</Link> do the work for you!</H3>
    var button = <Button handleOnClick={showSignInDialog} customStyle={{maxWidth: "208px", padding: "17px 50px", fontSize: "16px", fontWeight: 600}}>Get Started</Button>     
    var customStyle = 
    {
        padding: "53px 11.5%",
        backgroundColor: "#F5F7FF",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
    const cta = {heading, button, customStyle}



    return ( 
        <div className={styles.landingPage}>
            
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

            <MakeRoommateRequestLandingPageTemplate
                heroSection={heroSection}
                createProfile={createProfile}
                makeRoommateRequest={makeRoommateRequest}
                acceptConnection={acceptConnection}
                cta = {cta}
            />
        </div>

     );
}
 
export default MakeRoommateRequestLandingPage;