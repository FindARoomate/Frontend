import ImageTextSection from '../../../ui/organisms/ImageTextSection/ImageTextSection';
import globalStyles from './../../../../components/globalStyles.module.css';
import styles from './MakeRoommateRequestLandingPageTemplate.module.css';
import Header from '../../../ui/organisms/Header/Header';
import H2 from '../../../ui/atoms/Headings/H2/H2';
import TextButtonGroup from '../../../ui/molecules/TextButtonGroup/TextButtonGroup';
import Footer from '../../../ui/organisms/Footer/Footer';
import heroBackgroundImg from './../../../../images/make-roomate-request-hero-bg.png';
import LandingPageContactUs from '../../../pages/LandingPageContactUs/LandingPageContactUs';
import {v4 as uuidv4} from "uuid";

const MakeRoommateRequestLandingPageTemplate = (props) => 
{

    const {heroSection, createProfile, makeRoommateRequest, acceptConnection, cta, customHeader} = props;

    const heroStyle = 
    {
        background: `url(${heroBackgroundImg})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        padding: "70px 6.5%"
    }

    const headerLinks = 
    [
        {
            id: uuidv4(),
            text: "Home",
            path: '/create-request'
        },
        {
            id: uuidv4(),
            text: "How it works",
            path: '#how-it-works'
        },
        {
            id: uuidv4(),
            text: "Contact us",
            path: "#contact-us"
        },
        {
            id: uuidv4(),
            text: "Explore",
            path: "/view-all-requests"
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
                    <LandingPageContactUs/>
                </div>
                

                {/* Footer */}
                <Footer/>

        </div>
     );
}
 
export default MakeRoommateRequestLandingPageTemplate;