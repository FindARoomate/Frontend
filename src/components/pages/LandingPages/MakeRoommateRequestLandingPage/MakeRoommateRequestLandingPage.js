import MakeRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/MakeRoommateRequestLandingPageTemplate/MakeRoommateRequestLandingPageTemplate';
import heroImage from './../../../../images/make-roommate-request-landing-page-hero-image.svg';
import styles from './MakeRoommateRequestLandingPage.module.css';
import createProfileImage from './../../../../images/create-profile-section.svg';
import makeRoommateRequestImage from './../../../../images/make-roomate-request-section.svg';
import acceptRoommateConnection from './../../../../images/accept-roommate-connection-section.svg';
import heroBackgroundImg from './../../../../images/make-roomate-request-hero-bg.png';

const MakeRoommateRequestLandingPage = () => {

    //For how it works section
    const headingStyle = {fontSize:"32px", color: "black", fontFamily: "Open Sans", fontWeight: "600" }
    const descriptionStyle = {margin: "26px 0px", fontSize: "24px"}
    const buttonStyle = 
    {
        fontSize: "24px", 
        background: "none", 
        color: "#0029DD", 
        opacity: "70%",
        textDecoration: "underline", 
        textAlign: "left",
        padding: "0"
    }
    const imgStyle = {}
    var customStyle = {padding: "52px 0", alignItems: "center"}

    // Hero Section
    var heading =  {tag: "H1", text: "Find the perfect roommates..."}
    var description = {text: "A platform to allow people to connect with potential roommates", customStyle: {margin: "37.5px 0px", fontSize: "24px"}} 
    var button = {text: "Get Started", customStyle:{maxWidth: "208px", fontSize: "18px"}}
    var img = {src: heroImage , customStyle:{}}
    var order = "textFirst"
    const heroSection = {heading, description, button, img, order}

    // Create Profile Section
    var heading = {tag: "H3", text: "1. Create your profile", customStyle: headingStyle}
    var description = 
    {
        text: "What type of person are you? Create a profile and tell us about it."+
        "Then, tell us the kind of person you would want for a roommate. ", 
        customStyle: descriptionStyle
    } 
    var button = {text: "Create your profile now. >>", customStyle:buttonStyle}
    var img = {src: createProfileImage, customStyle:imgStyle}
    var order = "imageFirst"
    const createProfile = {heading, description, button, img, order, customStyle}

    // Make Roommate Section
    var heading =  {tag: "H3", text: "2. Make a roommate request", customStyle: headingStyle}
    var description = 
    {
        text: "Request for a roommate. Provide us with some information."+
        " We’ll match your request with simliar requests and notify you when we find the ideal roommate for you.", 
        customStyle: descriptionStyle
    } 
    var button = {text: "Start now.  >>", customStyle:buttonStyle}
    var img = {src: makeRoommateRequestImage, customStyle:imgStyle}
    var order = "textFirst"
    const makeRoommateRequest = {heading, description, button, img, order, customStyle}

    // Accept Connection Section
    var heading =  {tag: "H3", text: "3. Connect to your roommate", customStyle: headingStyle}
    var description = 
    {
        text: "When you accept a roommate request, we’ll provide you with the cantact details of your"+
        " roommie and you get to talk off the app.",
         customStyle: descriptionStyle
    } 
    var button = {text: "Get Started.>>", customStyle:buttonStyle}
    var img = {src: acceptRoommateConnection, customStyle:imgStyle}
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