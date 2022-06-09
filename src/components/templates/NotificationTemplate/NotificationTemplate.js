import NotificationListItem from "../../ui/molecules/NotificationListItem/NotificationListItem";
import DashboardTemplate from "../DashboardTemplate/DashboardTemplate";
import dp from './../../../images/card-display-picture.jpg';
import styles from './NotificationTemplate.module.css';
import settingsIcon from './../../../icons/setting-icon.svg';

const NotificationTemplate = ({data}) => 
{
    console.log(data);

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
                            dp={datum.connection.sender_data[0].image_url}
                            name = {datum.title}
                            description = {datum.content}
                            link = {getConnectionLink(datum)}
                        />);
                    })
                }
                
            </div>

        </DashboardTemplate>

     );
}
 
export default NotificationTemplate;