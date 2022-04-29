import ImageTextSection from '../../ui/organisms/ImageTextSection/ImageTextSection';
import globalStyles from './../../../components/globalStyles.module.css';
import Header from '../../ui/organisms/Header/Header';
import H2 from '../../ui/atoms/Headings/H2/H2';
import TextButtonGroup from '../../ui/molecules/TextButtonGroup/TextButtonGroup';
import ContactUsTemplate from '../ContactUsTemplate/ContactUsTemplate';
import mobileContactIcon from './../../../icons/mobile-contact-icon.svg';
import Footer from '../../ui/organisms/Footer/Footer';
import heroBackgroundImg from './../../../images/make-roomate-request-hero-bg.png';
import H3 from '../../ui/atoms/Headings/H3/H3';
import H1 from '../../ui/atoms/Headings/H1/H1';
import P from '../../ui/atoms/P/P';
import Button from '../../ui/atoms/Button/Button';
import parentStyles from './../LandingPages/MakeRoommateRequestLandingPageTemplate/MakeRoommateRequestLandingPageTemplate.module.css'
import Img from './../../ui/atoms/Img/Img';
import ComingSoonPageForm from '../../ui/organisms/ComingSoonPageForm/ComingSoonPageForm';
import styles from './ComingSoon2Template.module.css';
import { Link } from 'react-router-dom';

const ComingSoon2Template = (props) => {

    const {heroSection, createProfile, makeRoommateRequest, acceptConnection, customHeader} = props;

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
        button: <Link to="/">
                    <Button customStyle={{maxWidth: "208px", padding: "17px 50px", fontSize: "16px", fontWeight: 600}}>
                        Join Waitlist
                    </Button>
                </Link> 
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
            path: '/'
        },
        {
            id: 2,
            text: "How it works",
            path: '/#how-it-works'
        },
        {
            id: 3,
            text: "Contact us",
            path: "/#contact-us"
        }
    ]


    return ( 
        <div className={parentStyles.landingPage}>
            {/* Header */}
            <Header
                customStyle={{background: "#F5F7FF"}}
                links = {headerLinks}
            />
            
                
            {/* For Hero Section */}
            <div className={`${styles.heroSection} ${globalStyles.body}`}>
                <div className={parentStyles.comingSoonHero}>
                    <div className={parentStyles.text}>
                        {heroSection.heading}
                        {heroSection.description}
                    </div>
                    
                    <div className={styles.comingSoonForm}>
                        <ComingSoonPageForm/>
                    </div>
                </div>
                <div>
                    <Img src={heroSection.img.src}/>
                </div>
            </div>


            <div className= {`${globalStyles.body} ${parentStyles.makeRoommateRequestBody}`}>
                <div className={parentStyles.howItWorks} id="how-it-works">
                    {/* Heading */}
                    <H2>How it works</H2>

                    {/* Create Profile Section - Refactor to conditional*/}
                    <div className={parentStyles.createProfile}>
                        <ImageTextSection
                                heading = {createProfile.heading}
                                description = {createProfile.description}
                                img = {createProfile.img}
                                order = {createProfile.order}
                                customStyle = {createProfile.customStyle ? createProfile.customStyle : {}}
                        />
                    </div>
                    
                    {/* Make Roommate Request Section */}
                    <div className={parentStyles.makeRequest}>
                        <ImageTextSection
                                heading = {makeRoommateRequest.heading}
                                description = {makeRoommateRequest.description}
                                img = {makeRoommateRequest.img}
                                order = {makeRoommateRequest.order}
                                customStyle = {makeRoommateRequest.customStyle ? makeRoommateRequest.customStyle : {}}
                        />
                    </div>
                    
                    {/* Accept Roommate Connection Section */}
                    <div className={parentStyles.acceptConnection}>
                        <ImageTextSection
                                heading = {acceptConnection.heading}
                                description = {acceptConnection.description}
                                img = {acceptConnection.img}
                                order = {acceptConnection.order}
                                customStyle = {acceptConnection.customStyle ? acceptConnection.customStyle : {}}
                        />
                    </div>
                    
                    </div>
                </div>
                <div>
                {/* CTA Section */}
                <div className={parentStyles.cta}>
                    <TextButtonGroup
                        heading = {cta.heading}
                        description = {cta.description}
                        button = {cta.button}
                        customStyle = {cta.customStyle}
                    />
                </div>
                
            </div>       
            <div id="contact-us">
                {/* Contact Template */}
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
 
export default ComingSoon2Template;