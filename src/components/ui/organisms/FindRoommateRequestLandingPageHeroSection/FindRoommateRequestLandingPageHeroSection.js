import H1 from '../../atoms/Headings/H1/H1';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './FindRoommateRequestLandingPageHeroSection.module.css';
import SearchButton from '../../molecules/Search/SearchButton/SearchButton';


const FindRoommateRequestLandingPageHeroSection = () => 
{
    const [redirectLink, setRedirectLink] = useState("");
    
    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setRedirectLink("/view-all-requests?listing_title="+e.target[0].value);
    }
     
    return ( 
        <div className={styles.hero}>
            {redirectLink && <Navigate to={redirectLink} />}
            <div>
                <H1>Find the perfect roomates for you</H1>
                 <SearchButton
                    placeholder="e.g roommate in Agbowo"
                    handleSubmit={handleSubmit}
                />
            </div>
            {/* Left Side (It's currently empty but design can change) */}
            {/* <div>

            </div> */}

        </div>
     );
}
 
export default FindRoommateRequestLandingPageHeroSection;