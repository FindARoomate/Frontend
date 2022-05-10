import FindRoommateRequestLandingPageHeroSection from '../../../ui/organisms/FindRoommateRequestLandingPageHeroSection/FindRoommateRequestLandingPageHeroSection';
import FindRoommateRequestLandingPageCTA from '../../../ui/organisms/FindRoommateRequestLandingPageCTA/FindRoommateRequestLandingPageCTA';
import globalStyles from './../../../../components/globalStyles.module.css';
import mobileContactIcon from './../../../../icons/mobile-contact-icon.svg';
import ContactUsTemplate from '../../ContactUsTemplate/ContactUsTemplate';
import styles from './FindRoommateRequestLandingPageTemplate.module.css';
import Footer from '../../../ui/organisms/Footer/Footer';
import Header from '../../../ui/organisms/Header/Header';
import Button from '../../../ui/atoms/Button/Button';
import H2 from '../../../ui/atoms/Headings/H2/H2';
import DisplayCards from './DisplayCards';
import { Link } from 'react-router-dom';
import P from '../../../ui/atoms/P/P';

const FindRoommateRequestLandingPageTemplate = ({roommateRequests, isError, isSuccess}) => 
{
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
            text: "Contact us",
            path: '#contact-us'
        },
        {
            id: 2,
            text: "Create request",
            path: '/create-request'
        }
    ]

    return ( 
        <div className={styles.landingPage}>
            <Header
                links = {headerLinks}
                signIn = {true}
                createAccount = {true}
            />
            
            {/* For Hero Section */}
            <div>
                <FindRoommateRequestLandingPageHeroSection/>
            </div>

            <div className={`${globalStyles.body} ${styles.landingPageBody}`}>
                {/* For Explore Section */}
                <H2>Explore</H2>

                {/* To display roommate request cards */}
                <div className={styles.roommateRequests}>
                {isError && (<P>Something bad happened. Please try again</P>)}
                    {(isSuccess && roommateRequests) && (
                        <DisplayCards 
                            data={roommateRequests} 
                            pagination={false}
                        />)
                    }
                    {(isSuccess && !roommateRequests) && (<P>There are no roommates at this time</P>)}
                    <div className={styles.viewAllRequests}>
                        <Link to ="/view-all-requests">
                            <Button>View more requests</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <FindRoommateRequestLandingPageCTA/>

             {/* Contact Template */}

             <ContactUsTemplate
                    id = "contact-us"
                    preheading = {contact.preheading}
                    heading = {contact.heading}
                    subheading = {contact.subheading}
                    contactFields = {contact.contactFields}
                />
                
            {/* Footer */}
            <Footer/>

        </div>
     );
}
 
export default FindRoommateRequestLandingPageTemplate;