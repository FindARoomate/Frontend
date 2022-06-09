import NotificationTemplate from "../../templates/NotificationTemplate/NotificationTemplate";
import { GET_NOTIFICATIONS } from "../../routes";
import useGet from "../../../customHooks/useGet";
import { useEffect } from "react";

const Notification = () => 
{

    const {isSuccess, isError, APIData} = useGet(GET_NOTIFICATIONS, localStorage.getItem("accessToken"));

    useEffect(() => 
    {
        if(isSuccess||isError)
        {
            console.log(APIData);
        }
    }, [isSuccess, isError, APIData]);
    return ( 
        <NotificationTemplate
            data = {APIData}
        />
     );
}
 
export default Notification;