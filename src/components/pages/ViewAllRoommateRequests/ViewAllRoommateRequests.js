import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../routes';
import ViewAllRoommateRequestsTemplate from '../../templates/ViewAllRoommateRequestsTemplate/ViewAllRoommateRequestsTemplate';

const ViewAllRoommateRequests = () =>
{
    const search = useLocation().search;
    const pageId = new URLSearchParams(search).get('page');
    const searchTerm = new URLSearchParams(search).get('listing_title');
    
    const [url, setURL] = useState(GET_ALL_ROOMMATE_REQUESTS);

    const {isError, isSuccess, APIData} = useGet(url);

    console.log(APIData);

    useEffect(() => 
    {
        if(pageId)
        {
            setURL(GET_ALL_ROOMMATE_REQUESTS+"?page="+pageId);
        }

        if(searchTerm)
        {
            setURL(GET_ALL_ROOMMATE_REQUESTS+"?listing_title="+searchTerm)
        }
    }, [pageId, searchTerm]);

    
    

     return(

            <ViewAllRoommateRequestsTemplate
                roommateRequests={APIData}
                isSuccess = {isSuccess}
                isError = {isError}
            />
    );

}
 
export default ViewAllRoommateRequests;