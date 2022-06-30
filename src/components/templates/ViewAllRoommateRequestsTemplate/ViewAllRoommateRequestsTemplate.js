import DisplayCards from '../LandingPages/FindRoommateRequestLandingPageTemplate/DisplayCards';
import ExploreSearch from '../../ui/organisms/ExploreSearch/ExploreSearch';
import globalStyles from './../../../components/globalStyles.module.css';
import SearchBar from '../../ui/molecules/Search/SearchBar/SearchBar';
import styles from './ViewAllRoommateRequestsTemplate.module.css';
import Footer from '../../ui/organisms/Footer/Footer';
import Header from '../../ui/organisms/Header/Header';
import H2 from '../../ui/atoms/Headings/H2/H2';
import P from '../../ui/atoms/P/P';
import { useState } from 'react';

const ViewAllRoommateRequestsTemplate = ({isSuccess = null, isError = null, roommateRequests = null}) => 
{

    const [tagKeys, setTagKeys] = useState({});

    const updateTagKeys = (tagKeys) => 
    {
        setTagKeys(tagKeys);
    }
    
    const handleOnBlur = (e) => 
    {
        console.log(e.target.value);
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
        <div className={styles.viewMoreRequests}>
            <Header
                links = {headerLinks}
                signIn = {true}
                createAccount = {true}
            />

            <div className={`${globalStyles.body} ${styles.viewMoreRequestBody}`}>

                <H2>Explore</H2>
                <div className={styles.searchBar}>
                    <SearchBar 
                        placeholder="Search by city (e.g Ikeja)"
                        handleOnBlur={handleOnBlur}
                        />
                    <ExploreSearch
                        getTagKeys={updateTagKeys}
                    />
                </div>

                {/* To display roommate request cards */}
                <div className={styles.roommateRequests}>
                    {isError && (<P>Something bad happened. Please try again</P>)}
                    {!(roommateRequests || isError || isSuccess) && (<P>Loading ...</P>)}
                    {(isSuccess && roommateRequests) && (
                        <DisplayCards 
                            data={roommateRequests.results} 
                            pagination={true}
                            filters = {tagKeys}
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