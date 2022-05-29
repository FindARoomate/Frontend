

import { useEffect, useState } from 'react';
import useGet from '../../../customHooks/useGet';
import { GET_ALL_ROOMMATE_REQUESTS } from '../../routes';
import ViewAllRoommateRequestsTemplate from '../../templates/ViewAllRoommateRequestsTemplate/ViewAllRoommateRequestsTemplate';
import { useLocation } from 'react-router-dom';
import { TestContext } from '../../context';
import Button from '../../ui/atoms/Button/Button';

const ViewAllRoommateRequests = () =>
{

    const search = useLocation().search;
    const pageId = new URLSearchParams(search).get('page');
    
    const [url, setURL] = useState(GET_ALL_ROOMMATE_REQUESTS);

    const {isError, isSuccess, APIData} = useGet(url);

    useEffect(() => 
    {
        if(pageId)
        {
            setURL(GET_ALL_ROOMMATE_REQUESTS+"?page="+pageId);
        }
    }, [pageId]);

    
    

     return(

            <ViewAllRoommateRequestsTemplate
                roommateRequests={APIData}
                isSuccess = {isSuccess}
                isError = {isError}
            />
    );

}
 
export default ViewAllRoommateRequests;