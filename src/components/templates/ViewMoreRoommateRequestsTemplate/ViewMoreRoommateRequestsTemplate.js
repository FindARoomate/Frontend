import styles from './ViewMoreRoommateRequestsTemplate.module.css';
import Footer from '../../ui/organisms/Footer/Footer';
import Header from '../../ui/organisms/Header/Header';
import Button from '../../ui/atoms/Button/Button';
import H2 from '../../ui/atoms/Headings/H2/H2';
import DisplayCards from '../../templates/LandingPages/FindRoommateRequestLandingPageTemplate/DisplayCards';
import globalStyles from './../../../components/globalStyles.module.css';
import SearchBar from '../../ui/molecules/Search/SearchBar/SearchBar';
import ExploreSearch from '../../ui/organisms/ExploreSearch/ExploreSearch';

const ViewMoreRoommateRequestsTemplate = () => 
{
   
    const roommateRequests = {}
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
        <div className={styles.viewMoreRequests}>
            <Header
                links = {headerLinks}
                signIn = {true}
                createAccount = {true}
            />

            <div className={`${globalStyles.body} ${styles.landingPageBody}`}>

                <H2>Explore</H2>
                <div className={styles.searchBar}>
                    <SearchBar placeholder="Search by location"/>
                    <ExploreSearch/>
                </div>

                {/* To display roommate request cards */}
                <div className={styles.roommateRequests}>
                    <DisplayCards data={roommateRequests}/>
                </div>
            </div>

                
            {/* Footer */}
            <Footer/>

        </div>
     );
}
 
export default ViewMoreRoommateRequestsTemplate;