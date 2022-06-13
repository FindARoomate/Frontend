import NotificationListItem from "../../ui/molecules/NotificationListItem/NotificationListItem";
import DashboardTemplate from "../DashboardTemplate/DashboardTemplate";
import dp from './../../../images/card-display-picture.jpg';
import styles from './NotificationTemplate.module.css';
import settingsIcon from './../../../icons/setting-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import { UPDATE_NOTIFICATIONS } from "../../routes";
import { useEffect } from "react";
import {v4 as uuidv4} from "uuid";

const NotificationTemplate = ({data}) => 
{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const {isSuccess, isError, APIData, sendPatchRequest} = usePatch(myHeaders);

    const getConnectionLink = (datum) => 
    {
        if(datum.title.toLowerCase().includes("request accepted") || datum.title.toLowerCase().includes("request declined"))
        {
            return "/connection-sent/"+ datum.connection.id;
        }

        if(datum.title.toLowerCase().includes("request recieved") || datum.title.toLowerCase().includes("request accepted"))
        {
            return "/connection-received/"+ datum.connection.id;
        }
    }

    const handleClick = (e, id) => 
    {
        const formData = new FormData();
        formData.append("is_read", true);
        sendPatchRequest(UPDATE_NOTIFICATIONS + id + "/", formData);
    }

    useEffect(() => 
    {
        // if(isSuccess || isError) console.log(APIData);

    }, [isSuccess, isError, APIData])

    return ( 
        <DashboardTemplate
            showStatistics={false}
            title="Notifications"
            description="Catch up on what's been happening"
            dashboardIcon={settingsIcon}
            dashboardIconLink="/dashboard"
        >
            
            <div className={styles.notificationsContainer}>
                {
                data && data.map((datum) => 
                    {
                        return (
                        <NotificationListItem
                            key = {uuidv4()}
                            dp={datum.connection.sender_data[0].image_url}
                            name = {datum.title}
                            description = {datum.content}
                            link = {getConnectionLink(datum)}
                            id = {datum.id}
                            is_read = {datum.is_read}
                            handleClick = {handleClick}
                        />);
                    })
                }
                
            </div>

        </DashboardTemplate>

     );
}
 
export default NotificationTemplate;