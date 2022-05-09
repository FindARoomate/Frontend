import styles from './ViewAllRoommateRequestsTemplate.module.css';
import Footer from '../../ui/organisms/Footer/Footer';
import Header from '../../ui/organisms/Header/Header';
import H2 from '../../ui/atoms/Headings/H2/H2';
import DisplayCards from '../LandingPages/FindRoommateRequestLandingPageTemplate/DisplayCards';
import globalStyles from './../../../components/globalStyles.module.css';
import SearchBar from '../../ui/molecules/Search/SearchBar/SearchBar';
import ExploreSearch from '../../ui/organisms/ExploreSearch/ExploreSearch';
import P from '../../ui/atoms/P/P';

const ViewAllRoommateRequestsTemplate = ({isSuccess, isError, roommateRequests}) => 
{
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

            <div className={`${globalStyles.body} ${styles.viewMoreRequestBody}`}>

                <H2>Explore</H2>
                <div className={styles.searchBar}>
                    <SearchBar placeholder="Search by location"/>
                    <ExploreSearch/>
                </div>

                {/* To display roommate request cards */}
                <div className={styles.roommateRequests}>
                    {isError && (<P>Something bad happened. Please try again</P>)}
                    {(isSuccess && roommateRequests) && (
                        <DisplayCards 
                            data={roommateRequests} 
                            pagination={true}
                        />)
                    }
                    {(isSuccess && !roommateRequests) && (<P>There are no roommates at this time</P>)}
                </div>
            </div>

                
            {/* Footer */}
            <Footer/>

        </div>
     );
}
 
export default ViewAllRoommateRequestsTemplate;