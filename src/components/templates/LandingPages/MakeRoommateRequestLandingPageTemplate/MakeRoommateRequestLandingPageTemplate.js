import ImageTextSection from '../../../ui/organisms/ImageTextSection/ImageTextSection';
import globalStyles from './../../../../components/globalStyles.module.css';
import styles from './MakeRoommateRequestLandingPageTemplate.module.css';
import Header from '../../../ui/organisms/Header/Header';
import H2 from '../../../ui/atoms/Headings/H2/H2';
import TextButtonGroup from '../../../ui/molecules/TextButtonGroup/TextButtonGroup';
import ContactUsTemplate from '../../ContactUsTemplate/ContactUsTemplate';
import mobileContactIcon from './../../../../icons/mobile-contact-icon.svg';
import Footer from '../../../ui/organisms/Footer/Footer';
import heroBackgroundImg from './../../../../images/make-roomate-request-hero-bg.png';
import H3 from '../../../ui/atoms/Headings/H3/H3';
import Button from '../../../ui/atoms/Button/Button';
import SignInDialog from '../../../ui/organisms/Auth/SignIn/SignInDialog';
import { useState } from 'react';

const MakeRoommateRequestLandingPageTemplate = (props) => 
{

    const {heroSection, createProfile, makeRoommateRequest, acceptConnection, customHeader} = props;

    const [signInModalState, setSignInModalState] = useState(false);
    const [createAccountModalState, setCreateAccountModalState] = useState(false);

    const showSignInDialog = () => 
    {
        setSignInModalState(true);
    }

    const closeSignInModal = () => 
    {
        setSignInModalState(false);
    }


    const heroStyle = 
    {
        background: `url(${heroBackgroundImg})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        padding: "70px 6.5%"
    }

    const cta = 
    {
        heading: <H3 customStyle = {
            {
             
            }}>
            Getting an ideal roommate doesn't have to be stressful.<br></br>
            Allow <span style={{color: "#0029DD"}}>Findaroommate.com</span> do the work for you!</H3>
        ,
        button: <Button handleOnClick={showSignInDialog} customStyle={{maxWidth: "208px", padding: "17px 50px", fontSize: "16px", fontWeight: 600}}>
                    Get Started
                </Button> 
        , 
        customStyle:
        {
            padding: "53px 11.5%",
            backgroundColor: "#F5F7FF",
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
        }
    }

    const contact = 
    {
        preheading:
        {
            text: "CONTACT US",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        heading: 
        {
            text: "How can we help you?",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        subheading: 
        {
            text: "Fill the form or send an email",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        contactFields:
        [
            {
                key: 1,
                name: "Email Address",
                icon: mobileContactIcon,
                value: "contact@findaroommate.com"
            }
        ],
    }

    const headerLinks = 
    [
        {
            id: 1,
            text: "Home",
            path: '/create-request'
        },
        {
            id: 2,
            text: "How it works",
            path: '#how-it-works'
        },
        {
            id: 3,
            text: "Contact us",
            path: "#contact-us"
        }
    ]


    return ( 
        <div className={styles.landingPage}>
            {/* Header */}
            {customHeader ? customHeader : 
            (
                <Header
                    customStyle={{background: "#F5F7FF"}}
                    links = {headerLinks}
                    signIn = {true}
                />
            )}
            
            {/* Sign In Dialog */}
            {/* <SignInDialog open={signInModalState} closeModal={closeSignInModal}/> */}

            {/* For Hero Section */}
            <div className={styles.heroSection}>
                <ImageTextSection
                    heading = {heroSection.heading}
                    description = {heroSection.description}
                    button = {heroSection.button}
                    img = {heroSection.img}
                    order = {heroSection.order}
                    customStyle = {heroStyle}
                />
            </div>
            <div className= {`${globalStyles.body} ${styles.makeRoommateRequestBody}`}>
                <div className={styles.howItWorks} id="how-it-works">
                    {/* Heading */}
                    <H2>How it works</H2>

                    {/* Create Profile Section - Refactor to conditional*/}
                    <div className={styles.createProfile}>
                        <ImageTextSection
                                heading = {createProfile.heading}
                                description = {createProfile.description}
                                button = {createProfile.button}
                                img = {createProfile.img}
                                order = {createProfile.order}
                                customStyle = {createProfile.customStyle ? createProfile.customStyle : {}}
                        />
                    </div>
                    
                    {/* Make Roommate Request Section */}
                    <div className={styles.makeRequest}>
                        <ImageTextSection
                                heading = {makeRoommateRequest.heading}
                                description = {makeRoommateRequest.description}
                                button = {makeRoommateRequest.button}
                                img = {makeRoommateRequest.img}
                                order = {makeRoommateRequest.order}
                                customStyle = {makeRoommateRequest.customStyle ? makeRoommateRequest.customStyle : {}}
                        />
                    </div>
                    
                    {/* Accept Roommate Connection Section */}
                    <div className={styles.acceptConnection}>
                        <ImageTextSection
                                heading = {acceptConnection.heading}
                                description = {acceptConnection.description}
                                button = {acceptConnection.button}
                                img = {acceptConnection.img}
                                order = {acceptConnection.order}
                                customStyle = {acceptConnection.customStyle ? acceptConnection.customStyle : {}}
                        />
                    </div>
                    
                    </div>
                </div>
                <div>
                {/* CTA Section */}
                <div className={styles.cta}>
                    <TextButtonGroup
                        heading = {cta.heading}
                        description = {cta.description}
                        button = {cta.button}
                        customStyle = {cta.customStyle}
                    />
                </div>
                
            </div>       

                {/* Contact Template */}
                <div id="contact-us">
                    <ContactUsTemplate
                        preheading = {contact.preheading}
                        heading = {contact.heading}
                        subheading = {contact.subheading}
                        contactFields = {contact.contactFields}
                    />
                </div>
                

                {/* Footer */}
                <Footer/>

        </div>
     );
}
 
export default MakeRoommateRequestLandingPageTemplate;