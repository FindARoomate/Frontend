

import { useEffect, useState } from 'react';
import useGet from '../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../routes';
import ViewAllRoommateRequestsTemplate from '../../templates/ViewAllRoommateRequestsTemplate/ViewAllRoommateRequestsTemplate';

const ViewAllRoommateRequests = () =>
{

    const {isError, isSuccess, APIData} = useGet(GET_ALL_ROOMMATE_REQUESTS)
    
     return(<ViewAllRoommateRequestsTemplate
            roommateRequests={APIData}
            isSuccess = {isSuccess}
            isError = {isError}
        />);

}
 
export default ViewAllRoommateRequests;