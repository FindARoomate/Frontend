import FindRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/FindRoommateRequestLandingPageTemplate/FindRoommateRequestLandingPageTemplate';
import { useState } from 'react';
import useGet from '../../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../../routes';

const FindRoommateRequestLandingPage = () => 
{
     // Hero Section
     var heading =  {tag: "H1", text: "Find the perfect roommates for you"}
     const heroSection = {heading}

     const [roommateRequests, setRoommateRequests] = useState(null);
    const token = localStorage.getItem("accessToken");
    const dependencies = [];
    const {isError, isSuccess, APIData} = useGet(GET_ALL_ROOMMATE_REQUESTS, null, dependencies)

    return ( 
        <FindRoommateRequestLandingPageTemplate
            roommateRequests={APIData ? APIData.results : null}
            isSuccess = {isSuccess}
            isError = {isError}
        />
     );
}
 
export default FindRoommateRequestLandingPage;