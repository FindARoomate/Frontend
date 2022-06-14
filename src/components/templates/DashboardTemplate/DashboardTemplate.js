import activeConnectionReceived from './../../../icons/active-connection-received.svg';
import activeInactiveRequest from './../../../icons/active-inactive-request.svg';
import activeConnectionSent from './../../../icons/active-connection-sent.svg';
import activeActiveRequest from './../../../icons/active-active-request.svg';
import connectionReceived from './../../../icons/connection-received.svg';
import globalStyles from './../../../components/globalStyles.module.css';
import LogoutDialog from '../../ui/organisms/LogoutDialog/LogoutDialog';
import notificationIcon from './../../../icons/notification-icon.svg';
import inactiveRequest from './../../../icons/inactive-request.svg';
import connectionSent from './../../../icons/connection-sent.svg';
import dashboardImg from './../../../images/dashboard-image.png';
import activeRequest from './../../../icons/active-request.svg';
import overviewIcon from './../../../icons/overview-icon.svg';
import dashboardStyles from './DashboardTemplate.module.css';
import logoutIcon from './../../../icons/logout-icon.svg';
import { useContext, useState, useCallback } from 'react';
import Header from '../../ui/organisms/Header/Header';
import useGet from '../../../customHooks/useGet';
import { UserContext } from '../../context';
import Lightbox from 'react-image-lightbox';
import { STATISTICS } from '../../routes';
import Img from '../../ui/atoms/Img/Img';
import {Link} from 'react-router-dom';
import P from '../../ui/atoms/P/P';
import {v4 as uuidv4} from "uuid";

const DashboardTemplate = ({
        children,
        showStatistics=true,
        title = "Welcome back",
        description = "Here is an overview of your activities",
        dashboardIcon = notificationIcon,
        dashboardIconLink = "/notifications"
    }) => 
{
    
    const {userProfile} = useContext(UserContext);

    if(title == "Welcome back") title = "Welcome back " + userProfile.fullname;
  
    const imgLinkStyle = 
    {
        height: "14px",
        width: "auto",
        marginRight: "8.5px"
    }

    const headerLinks = 
    [
        {
            id: uuidv4(),
            text: "Create request",
            path: '/create-roommate-request-instruction'
        },
        {
            id: uuidv4(),
            text: "Explore requests",
            path: '/view-all-requests'
        },
        {
            id: uuidv4(),
            text: "Contact us",
            path: '/#contact-us'
        },

    ]

    const mobileLinks = 
    [
        {
            id: 1,
            text: <><Img customStyle={imgLinkStyle} src={overviewIcon}/>Overview</>,
            path: '/dashboard'
        },
        {
            id: 2,
            text: <><Img customStyle={imgLinkStyle} src={connectionSent}/>Connection Sent</>,
            path: '/connection-sent'
        },
        {
            id: 3,
            text: <><Img customStyle={imgLinkStyle} src={connectionReceived}/>Connection Received</>,
            path: '/connection-received'
        },
        {
            id: 4,
            text: <><Img customStyle={imgLinkStyle} src={activeRequest}/>Active Request</>,
            path: '/active-requests'
        },
        {
            id: 5,
            text: <><Img customStyle={imgLinkStyle} src={inactiveRequest}/>Inactive Request</>,
            path: '/inactive-requests'
        }
    ]

    const currentPath = window.location.pathname;
    
    // Logout Menu Dialog Box controls
    const [logoutModalState, setLogoutModalState] = useState(false);
    const closeLogoutDialog = () => setLogoutModalState(false);
    const openLogoutDialog = () => setLogoutModalState(true);

    // Get Statistics
    const token = localStorage.getItem("accessToken");
    const {isSucccess, isError, APIData} = useGet(STATISTICS, token);

    // For Photo LightBox
    let [photoIndex, setPhotoIndex] = useState(0);
    let [isProfileLightBoxOpen, setIsProfileLightBoxOpen] = useState(false);

        
    // Initializing the lightbox
    const openLightBox = useCallback(() => { setIsProfileLightBoxOpen(true); }, []);

    return (  
    <div className={dashboardStyles.viewMoreRequests}>
        <Header
            mobileLinks={mobileLinks}
            links = {headerLinks}
            customStyle={{backgroundColor: '#F5F7FF'}}
            showProfile = {true}
            showLogout = {true}
        />

        <div className={`${globalStyles.body} ${dashboardStyles.dashboardBody}`}>
            <div className={dashboardStyles.dashboardContainer}>
                <div className={dashboardStyles.sidebarContainer}>
                <div className={dashboardStyles.sidebar}>
                    <div className={dashboardStyles.image}>
                        <Img src={userProfile.image_url}  onClick={openLightBox}/>
                        {isProfileLightBoxOpen && (
                        <Lightbox
                            mainSrc={userProfile.image_url}
                            onCloseRequest={() => setIsProfileLightBoxOpen(false)}
                        />
                        )
                    }
                    </div>
                    <div className={dashboardStyles.links}>
                        <ul>
                            <li className= {currentPath === "/dashboard" ? dashboardStyles.active : ""} >
                                <Link to="/dashboard">
                                    <span className={dashboardStyles.icon}>
                                        <Img src={overviewIcon}/>
                                        </span>
                                    <span className={dashboardStyles.text}>Overview</span>
                                </Link>
                            </li>
                            <li className= {currentPath === "/connection-sent" ? dashboardStyles.active : ""} >
                                <Link to="/connection-sent">
                                    <span className={dashboardStyles.icon}><Img src={connectionSent}/></span>
                                    <span className={dashboardStyles.text}>Connection sent</span>
                                </Link>
                            </li>
                            <li className= {currentPath === "/connection-received" ? dashboardStyles.active : ""} >
                                <Link to="/connection-received">
                                    <span className={dashboardStyles.icon}><Img src={connectionReceived}/></span>
                                    <span className={dashboardStyles.text}>Connection received</span>
                                </Link>
                            </li>
                            <li className= {currentPath === "/active-requests" ? dashboardStyles.active : ""} >
                                <Link to="/active-requests">
                                    <span className={dashboardStyles.icon}><Img src={activeRequest}/></span>
                                    <span className={dashboardStyles.text}>Active Request</span>
                                </Link>
                            </li>
                            <li className= {currentPath === "/inactive-requests" ? dashboardStyles.active : ""} >
                                <Link to="/inactive-requests">
                                    <span className={dashboardStyles.icon}><Img src={inactiveRequest}/></span>
                                    <span className={dashboardStyles.text}>Inactive request</span>
                                </Link>
                            </li>
                        </ul>
                        <div className={dashboardStyles.logout}>
                            <span className={dashboardStyles.icon}><Img src={logoutIcon}/></span>
                            <span onClick={openLogoutDialog} className={dashboardStyles.text}>Logout</span>
                        </div>
                    </div>
                </div>
                </div>
                <div className={dashboardStyles.mainContent}>
                    <div className={dashboardStyles.welcomePanel}>
                        <div className={dashboardStyles.welcomeMessage}>
                            <Img src={userProfile.image_url}/>
                            <div>
                                <P>{title}</P>
                                <P>{description}</P>
                            </div>
                        </div>
                        <Link to={dashboardIconLink}>
                        <div className={dashboardStyles.notification}>
                                <Img src={dashboardIcon}/>
                        </div> 
                        </Link> 
                    </div>

                    <div className={dashboardStyles.contentBody}>
                        {showStatistics && (
                        <div className={dashboardStyles.dashboardCards}>
                            <Link to="/connection-sent">
                                <div className={`${dashboardStyles.card} ${currentPath === "/connection-sent" ? dashboardStyles.active : ""}`}>
                                    <div className={dashboardStyles.img}>
                                        <Img src={currentPath === "/connection-sent" ? activeConnectionSent : connectionSent}/>
                                    </div>
                                    <P>Connection sent</P>
                                    <P>{APIData ? APIData.connections_sent : ""}</P>
                                </div>
                            </Link>

                           <Link to="/connection-received">
                            <div className={`${dashboardStyles.card} ${currentPath === "/connection-received" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={currentPath === "/connection-received" ? activeConnectionReceived : connectionReceived}/>
                                </div>
                                <P>Connection received</P>
                                <P>{APIData ? APIData.connections_recieved : ""}</P>
                            </div>
                            </Link>

                            <Link to="/active-requests">
                            <div className={`${dashboardStyles.card} ${currentPath === "/active-requests" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={currentPath === "/active-requests" ? activeActiveRequest : activeRequest}/>
                                </div>
                                <P>Active request</P>
                                <P>{APIData ? APIData.active_requests : ""}</P>
                            </div>
                            </Link>

                            <Link to="/inactive-requests">
                            <div className={`${dashboardStyles.card} ${currentPath === "/inactive-requests" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={currentPath === "/inactive-requests" ? activeInactiveRequest : inactiveRequest}/>
                                </div>
                                <P>Inactive request</P>
                                <P>{APIData ? APIData.inactive_requests : ""}</P>
                            </div>
                            </Link>

                        </div>
                        )}
                    </div>
                    <div className={dashboardStyles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>

        {/* Logout pop-up */}
        <LogoutDialog
            open={logoutModalState}
            closeModal={closeLogoutDialog}
        />

    </div>
    );
}
 
export default DashboardTemplate;