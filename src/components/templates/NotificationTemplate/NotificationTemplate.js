import NotificationListItem from "../../ui/molecules/NotificationListItem/NotificationListItem";
import DashboardTemplate from "../DashboardTemplate/DashboardTemplate";
import dp from './../../../images/card-display-picture.jpg';
import styles from './NotificationTemplate.module.css';
import settingsIcon from './../../../icons/setting-icon.svg';

const NotificationTemplate = () => {
    return ( 
        <DashboardTemplate
            showStatistics={false}
            title="Notifications"
            description="Catch up on what's been happening"
            dashboardIcon={settingsIcon}
            dashboardIconLink="/"
        >
            
            <div className={styles.notificationsContainer}>
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
                <NotificationListItem
                    dp={dp}
                    name = "Connection request received"
                    description = "Precious Faseyosan just sent you a connection request."
                />
            </div>

        </DashboardTemplate>

     );
}
 
export default NotificationTemplate;