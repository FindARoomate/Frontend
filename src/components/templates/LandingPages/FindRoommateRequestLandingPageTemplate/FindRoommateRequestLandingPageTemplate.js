import FindRoommateRequestLandingPageHeroSection from '../../../ui/organisms/FindRoommateRequestLandingPageHeroSection/FindRoommateRequestLandingPageHeroSection';
import globalStyles from './../../../../components/globalStyles.module.css';
import DisplayCards from '../../../ui/organisms/DisplayCards/DisplayCards';
import styles from './FindRoommateRequestLandingPageTemplate.module.css';
import Header from '../../../ui/organisms/Header/Header';
import H2 from '../../../ui/atoms/Headings/H2/H2';

const FindRoommateRequestLandingPageTemplate = ({roommateRequests}) => {
    return ( 
        <div className={styles.landingPage}>
            <Header/>
            
            {/* For Hero Section */}
            <div className={styles.heroSection}>
                <FindRoommateRequestLandingPageHeroSection/>
            </div>

            <div className={`${globalStyles.body} ${styles.comingSoonBody}`}>
                {/* For Explore Section */}
                <H2
                    customStyle=
                    {{
                            fontSize: "56px",
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            color: "black",
                            textAlign: "center"
                        }}
                >
                    Explore
                </H2>

                {/* To display roommate request cards */}
                <DisplayCards
                    data={roommateRequests}
                />
            </div>
        </div>
     );
}
 
export default FindRoommateRequestLandingPageTemplate;