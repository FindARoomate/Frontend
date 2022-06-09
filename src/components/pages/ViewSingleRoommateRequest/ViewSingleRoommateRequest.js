import { useParams } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';
import { GET_SINGLE_ROOMMATE_REQUEST } from '../../routes';
import ViewSingleRoommateRequestTemplate from "../../templates/ViewSingleRoommateRequestTemplate/ViewSingleRoommateRequestTemplate";
import { useState } from 'react';

const ViewSingleRoommateRequest = () => 
{

    const {id} = useParams();
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + "/";
    var {isError, isSuccess, APIData} = useGet(url);

    return ( 
            <ViewSingleRoommateRequestTemplate
                roommateRequest = {APIData}
            />
        );

    
}
 
export default ViewSingleRoommateRequest;