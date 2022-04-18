import MakeRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/MakeRoommateRequestLandingPageTemplate/MakeRoommateRequestLandingPageTemplate';
import heroImage from './../../../../images/make-roommate-request-landing-page-hero-image.svg';
import styles from './MakeRoommateRequestLandingPage.module.css';
import createProfileImage from './../../../../images/create-profile-section.svg';
import makeRoommateRequestImage from './../../../../images/make-roomate-request-section.svg';
import acceptRoommateConnection from './../../../../images/accept-roommate-connection-section.svg';
import heroBackgroundImg from './../../../../images/make-roomate-request-hero-bg.png';
import H1 from '../../../ui/atoms/Headings/H1/H1';
import H3 from '../../../ui/atoms/Headings/H3/H3';
import TextButtonGroup from '../../../ui/molecules/TextButtonGroup/TextButtonGroup';
import P from '../../../ui/atoms/P/P';
import Button from '../../../ui/atoms/Button/Button';
const MakeRoommateRequestLandingPage = () => {

    //For how it works section
    var customStyle = {alignItems: "center"}

    // Hero Section
    var heading =  <H1>Find the perfect roommates...</H1>
    var description = <P> A platform to allow people to connect with potential roommates</P>
    var button = <Button>Get Started</Button>
    var img = {src: heroImage}
    var order = "textFirst"
    const heroSection = {heading, description, button, img, order}

    // Create Profile Section
    var heading = <H3>1. Create your <span style={{color: "#0029DD"}}>profile</span></H3>;
    var description = <P>What type of person are you? Create a profile and tell us about it. Then, tell us 
        the kind of person you would want for a roommate.</P>;
    var button = <Button>{"Create your profile now. >>"}</Button>
    var img = {src: createProfileImage}
    var order = "imageFirst"
    const createProfile = {heading, description, button, img, order, customStyle}

    // Make Roommate Section
    var heading = <H3>2. Make a roommate <span style={{color: "#0029DD"}}>request</span></H3>
    var description = <P>Request for a roommate. Provide us with some information. We’ll match your request 
        with simliar requests and notify you when we find the ideal roommate for you.</P>;
    var button = <Button>{"Start now. >>"}</Button>
    var img = {src: makeRoommateRequestImage}
    var order = "textFirst"
    const makeRoommateRequest = {heading, description, button, img, order, customStyle}

    // Accept Connection Section
    var heading =  <H3>3. <span style={{color: "#0029DD"}}>Connect</span> to your roommate</H3>
    var description = <P>When you accept a roommate request, we’ll provide you with the 
        contact details of your roommie and you get to talk off the app.</P>;

    var button = <Button>{"Get Started. >>"}</Button>
    var img = {src: acceptRoommateConnection}
    var order = "imageFirst"
    const acceptConnection = {heading, description, button, img, order, customStyle}
    

    return ( 
        <div className={styles.landingPage}>

            <MakeRoommateRequestLandingPageTemplate
                heroSection={heroSection}
                createProfile={createProfile}
                makeRoommateRequest={makeRoommateRequest}
                acceptConnection={acceptConnection}
            />
        </div>

     );
}
 
export default MakeRoommateRequestLandingPage;