import { useParams } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';
import { GET_SINGLE_ROOMMATE_REQUEST } from '../../routes';
import ViewSingleRoommateRequestTemplate from "../../templates/ViewSingleRoommateRequestTemplate/ViewSingleRoommateRequestTemplate";

const ViewSingleRoommateRequest = () => 
{

    const {id} = useParams();
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + "/";
    var {isError, isSuccess, APIData} = useGet(url);

    console.log(APIData)
 
    return ( 
        <ViewSingleRoommateRequestTemplate
        roommateRequest = {APIData}
        />
        );

    
}
 
export default ViewSingleRoommateRequest;