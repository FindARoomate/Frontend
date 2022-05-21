import SingleRequest from "../../templates/SingleRequestTemplate/SingleRequestTemplate";
import usePatch from "../../../customHooks/usePatch";
import { DEACTIVATE_ROOMMATE_REQUEST } from "../../routes";
import { useEffect } from "react";
import P from "../../ui/atoms/P/P";

const SingleActiveRequest = () => 
{
   
    const token = "Bearer " + localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", token);

    const {isSuccess, isError, APIData, sendPatchRequest} = usePatch(myHeaders);


    const deactivateRequest = (id) => 
    {
        const url = DEACTIVATE_ROOMMATE_REQUEST + id + '/'; 
        const formData = new FormData();
        formData.append('is_active', false);
        sendPatchRequest(url, formData);
    }

    useEffect(() => 
    {
        console.log(APIData);

    }, [APIData]);

    return ( 
        <>
            {isSuccess && <P customStyle={{textTransform: "capitalize"}}>{APIData.detail}</P>}
            {!isSuccess &&  
                <SingleRequest
                    btnText="Deactivate Request"
                    handleButtonOnClick = {deactivateRequest}
                />
            }
        </>
       
     );
}
 
export default SingleActiveRequest;