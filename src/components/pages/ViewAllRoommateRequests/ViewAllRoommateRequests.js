import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useViewAllRoommateRequestData } from '../../../customHooks/useRoommateRequestData';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../routes';
import ViewAllRoommateRequestsTemplate from '../../templates/ViewAllRoommateRequestsTemplate/ViewAllRoommateRequestsTemplate';

const ViewAllRoommateRequests = () =>
{
    const search = useLocation().search;
    const pageId = new URLSearchParams(search).get('page');
    const searchTerm = new URLSearchParams(search).get('city');
    
    const [url, setURL] = useState(GET_ALL_ROOMMATE_REQUESTS);

    const { isLoading, isError, isSuccess, data:APIData } = useViewAllRoommateRequestData();

    console.log(APIData);

    useEffect(() => 
    {
        if(pageId)
        {
            setURL(GET_ALL_ROOMMATE_REQUESTS+"?page="+pageId);
        }

        if(searchTerm)
        {
            setURL(GET_ALL_ROOMMATE_REQUESTS+"?city="+searchTerm)
        }
    }, [pageId, searchTerm]);

     return(

            <ViewAllRoommateRequestsTemplate
                roommateRequests={APIData}
                isLoading = {isLoading}
                isSuccess = {isSuccess}
                isError = {isError}
            />
    );

}
 
export default ViewAllRoommateRequests;