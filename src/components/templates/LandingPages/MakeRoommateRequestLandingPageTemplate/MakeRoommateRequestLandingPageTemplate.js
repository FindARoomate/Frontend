import ImageTextSection from '../../../ui/organisms/ImageTextSection/ImageTextSection';
import globalStyles from './../../../../components/globalStyles.module.css';
import styles from './MakeRoommateRequestLandingPageTemplate.module.css';
import Header from './../../../../Header';
import H2 from '../../../ui/atoms/Headings/H2/H2';
import TextButtonGroup from '../../../ui/molecules/TextButtonGroup/TextButtonGroup';
import ContactUsTemplate from '../../ContactUsTemplate/ContactUsTemplate';
import mobileContactIcon from './../../../../icons/mobile-contact-icon.svg';
import Footer from '../../../ui/organisms/Footer/Footer';

const MakeRoommateRequestLandingPageTemplate = (props) => {

    const {heroSection, createProfile, makeRoommateRequest, acceptConnection} = props;
    const headingStyle = 
    {
        fontWeight: "bold", 
        fontSize:"48px", 
        textAlign: "center", 
        fontFamily: "Open Sans", 
        color: "black"
    }

    const cta = 
    {
        heading: 
        {
            tag: "H3",
            text: "Getting an ideal roommate doesn’t have to be stressful. Allow Findaroommate.com do the work for you!",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
                marginBottom: "62px"
            }
        },
        button: 
        {
            text: "Get Started",
            customStyle: 
            {
                maxWidth: "208px",
                padding: "17px 50px",
                fontSize: "16px",
                fontWeight: 600
            }
        }, 
        customStyle:
        {
            padding: "53px 166px",
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


    return ( 
        <div className={styles.landingPage}>
            {/* Header */}
            <Header/>
            <div className= {`${globalStyles.body} ${styles.comingSoonBody}`}>
                
                {/* For Hero Section */}
                <div className={styles.heroSection}>
                    <ImageTextSection
                        heading = {heroSection.heading}
                        description = {heroSection.description}
                        button = {heroSection.button}
                        img = {heroSection.img}
                        order = {heroSection.order}
                        customStyle = {heroSection.customStyle ? heroSection.customStyle : {}}
                    />
                </div>

                <div className={styles.howItWorks}>

                    {/* Heading */}
                    <H2 customStyle={headingStyle}>How it works</H2>

                    {/* Create Profile Section */}
                    <ImageTextSection
                            heading = {createProfile.heading}
                            description = {createProfile.description}
                            button = {createProfile.button}
                            img = {createProfile.img}
                            order = {createProfile.order}
                            customStyle = {createProfile.customStyle ? createProfile.customStyle : {}}
                    />

                    {/* Make Roommate Request Section */}
                    <ImageTextSection
                            heading = {makeRoommateRequest.heading}
                            description = {makeRoommateRequest.description}
                            button = {makeRoommateRequest.button}
                            img = {makeRoommateRequest.img}
                            order = {makeRoommateRequest.order}
                            customStyle = {makeRoommateRequest.customStyle ? makeRoommateRequest.customStyle : {}}
                    />

                    {/* Accept Roommate Connection Section */}
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

            <div>
                    {/* CTA Section */}
                    <TextButtonGroup
                        heading = {cta.heading}
                        description = {cta.description}
                        button = {cta.button}
                        customStyle = {cta.customStyle}
                    />

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
 
export default MakeRoommateRequestLandingPageTemplate;