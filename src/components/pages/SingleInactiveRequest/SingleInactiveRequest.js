import SingleRequest from "../../templates/SingleRequestTemplate/SingleRequestTemplate";
import usePatch from "../../../customHooks/usePatch";
import { ACTIVATE_ROOMMATE_REQUEST } from "../../routes";
import { useEffect} from "react";
import P from "../../ui/atoms/P/P";

const SingleInactiveRequest = () => 
{
    const token = "Bearer " + localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const {isSuccess, isError, APIData, sendPatchRequest} = usePatch(myHeaders);


    const activateRequest = (id) => 
    {
        const url = ACTIVATE_ROOMMATE_REQUEST + id + '/'; 

        const formData = new FormData();
        formData.append("is_active", true);

        sendPatchRequest(url, formData);
    }

    useEffect(() => 
    {
        console.log(APIData);

    }, [APIData]);


    return ( 
        <>
        {isSuccess && <P customStyle={{textTransform: "capitalize"}}>{APIData.detail}</P>}
        {!isSuccess && <SingleRequest
            btnText="Activate Request"
            handleButtonOnClick = {activateRequest}
        />}
        </>
        
     );
}
 
export default SingleInactiveRequest;