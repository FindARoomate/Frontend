import FindRoommateRequestLandingPageTemplate from '../../../templates/LandingPages/FindRoommateRequestLandingPageTemplate/FindRoommateRequestLandingPageTemplate';
import { useState } from 'react';
import useGet from '../../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../../routes';

const FindRoommateRequestLandingPage = () => 
{
    const {isError, isSuccess, APIData} = useGet(GET_ALL_ROOMMATE_REQUESTS);

    return ( 
        <FindRoommateRequestLandingPageTemplate
            roommateRequests={APIData}
            isSuccess = {isSuccess}
            isError = {isError}
        />
     );
}
 
export default FindRoommateRequestLandingPage;