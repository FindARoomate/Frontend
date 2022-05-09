

import { useEffect, useState } from 'react';
import useGet from '../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../routes';
import ViewAllRoommateRequestsTemplate from '../../templates/ViewAllRoommateRequestsTemplate/ViewAllRoommateRequestsTemplate';

const ViewAllRoommateRequests = () =>
{

    const [roommateRequests, setRoommateRequests] = useState(null);
    const token = localStorage.getItem("accessToken");
    const dependencies = [];
    const {isError, isSuccess, APIData} = useGet(GET_ALL_ROOMMATE_REQUESTS, token, dependencies)
    console.log(APIData);
    return ( 
        <ViewAllRoommateRequestsTemplate
            roommateRequests={APIData}
            isSuccess = {isSuccess}
            isError = {isError}
        />
     );
}
 
export default ViewAllRoommateRequests;