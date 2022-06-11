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
import {v4 as uuidv4} from "uuid";

const FindRoommateRequestLandingPageTemplate = ({roommateRequests = [], isError = null, isSuccess = null}) => 
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
                value: <a href="mailto:contact@findaroommate.com">contact@findaroommate.com</a>
            }
        ],
    }

    const headerLinks = 
    [
        {
            id: uuidv4(),
            text: "Contact us",
            path: '#contact-us'
        },
        {
            id: uuidv4(),
            text: "Create request",
            path: '/create-request'
        },
        {
            id: uuidv4(),
            text: "Explore",
            path: '/view-all-requests'
        }
    ]

    return ( 
        <div className={styles.landingPage}>
            <Header
                links = {headerLinks}
                signIn = {true}
                createAccount = {true}
                activePage="findRoomates"
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
                {!(isError || isSuccess || roommateRequests) && <P>Loading...</P>}
                {isError && (<P>Something bad happened. Please try again</P>)}
                
                {roommateRequests!=null &&      
                <>
                    {(isSuccess && roommateRequests.count > 0) && (
                        <>
                            <DisplayCards 
                                data={roommateRequests.results} 
                                count={roommateRequests.count}
                                pagination={false}
                            />
                            <div className={styles.viewAllRequests}>
                                <Link to ="/view-all-requests">
                                    <Button>View more requests</Button>
                                </Link>
                            </div>
                        </>
                        )}
                    {(isSuccess && roommateRequests.count < 1) && (<P>There are no roommate requests at this time</P>)}
                </>           
                }
                </div>
            </div>

            {/* CTA */}
            <FindRoommateRequestLandingPageCTA/>

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
 
export default FindRoommateRequestLandingPageTemplate;