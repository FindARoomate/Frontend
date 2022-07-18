import { useParams } from 'react-router-dom';
import { GET_SINGLE_ROOMMATE_REQUEST } from '../../routes';
import ViewSingleRoommateRequestTemplate from "../../templates/ViewSingleRoommateRequestTemplate/ViewSingleRoommateRequestTemplate";
import { useViewSingleRoommateRequestData } from '../../../customHooks/useRoommateRequestData';

const ViewSingleRoommateRequest = () => 
{

    const { id } = useParams();
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + "/";
    var { isLoading, isError, isSuccess, data:APIData } = useViewSingleRoommateRequestData(id)


    return ( 
            <ViewSingleRoommateRequestTemplate
                roommateRequest = {APIData}
            />
        );

    
}
 
export default ViewSingleRoommateRequest;