import connectionReceived from './../../../icons/connection-received.svg';
import globalStyles from './../../../components/globalStyles.module.css';
import inactiveRequest from './../../../icons/inactive-request.svg';
import connectionSent from './../../../icons/connection-sent.svg';
import activeRequest from './../../../icons/active-request.svg';
import dashboardImg from './../../../images/dashboard-image.png';
import overviewIcon from './../../../icons/overview-icon.svg';
import Header from '../../ui/organisms/Header/Header';
import dashboardStyles from './DashboardTemplate.module.css';
import Img from '../../ui/atoms/Img/Img';
import {Link} from 'react-router-dom';
import P from '../../ui/atoms/P/P';

const DashboardTemplate = ({children}) => 
{
    const headerLinks = 
    [
        {
            id: 1,
            text: "Contact us",
            path: '#contact-us'
        },
        {
            id: 2,
            text: "Create request",
            path: '/create-request'
        }
    ]

    const currentPath = window.location.pathname;

    return (  
    <div className={dashboardStyles.viewMoreRequests}>
        <Header
            links = {headerLinks}
            customStyle={{backgroundColor: '#F5F7FF',position:'fixed'}}
        />

        <div className={`${globalStyles.body} ${dashboardStyles.dashboardBody}`}>
            <div className={dashboardStyles.dashboardContainer}>
                <div className={dashboardStyles.sidebarContainer}>
                <div className={dashboardStyles.sidebar}>
                    <div className={dashboardStyles.image}>
                        <Img src={dashboardImg}/>
                        {/* <div className={dashboardStyles.overlay}></div> */}
                    </div>
                    <div className={dashboardStyles.links}>
                        <ul>
                            <li className= {currentPath == "/dashboard" ? dashboardStyles.active : ""} >
                                <Link to="/dashboard">
                                    <span className={dashboardStyles.icon}><Img src={overviewIcon}/></span>
                                    <span className={dashboardStyles.text}>Overview</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/connection-sent" ? dashboardStyles.active : ""} >
                                <Link to="/connection-sent">
                                    <span className={dashboardStyles.icon}><Img src={connectionSent}/></span>
                                    <span className={dashboardStyles.text}>Connection sent</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/connection-received" ? dashboardStyles.active : ""} >
                                <Link to="/connection-received">
                                    <span className={dashboardStyles.icon}><Img src={connectionReceived}/></span>
                                    <span className={dashboardStyles.text}>Connection received</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/active-requests" ? dashboardStyles.active : ""} >
                                <Link to="/active-requests">
                                    <span className={dashboardStyles.icon}><Img src={activeRequest}/></span>
                                    <span className={dashboardStyles.text}>Active Request</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/inactive-requests" ? dashboardStyles.active : ""} >
                                <Link to="/inactive-requests">
                                    <span className={dashboardStyles.icon}><Img src={inactiveRequest}/></span>
                                    <span className={dashboardStyles.text}>Inactive request</span>
                                </Link>
                            </li>
                        </ul>
                        <div className={dashboardStyles.logout}>
                            <Link to="/">
                                <span className={dashboardStyles.icon}><Img src={overviewIcon}/></span>
                                <span className={dashboardStyles.text}>Logout</span>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                </div>
                <div className={dashboardStyles.mainContent}>
                    <div className={dashboardStyles.welcomePanel}>
                        <div className={dashboardStyles.welcomeMessage}>
                            <Img src={dashboardImg}/>
                            <div>
                                <P>Welcome back Precious</P>
                                <P>Here is an overview of your activities</P>
                            </div>
                        </div>
                        <div className={dashboardStyles.notification}></div>
                    </div>

                    <div className={dashboardStyles.contentBody}>
                        <div className={dashboardStyles.dashboardCards}>
                            <Link to="/connection-sent">
                                <div className={`${dashboardStyles.card} ${currentPath == "/connection-sent" ? dashboardStyles.active : ""}`}>
                                    <div className={dashboardStyles.img}>
                                        <Img src={connectionSent}/>
                                    </div>
                                    <P>Connection sent</P>
                                    <P>5</P>
                                </div>
                            </Link>

                           <Link to="/connection-received">
                            <div className={`${dashboardStyles.card} ${currentPath == "/connection-received" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={connectionReceived}/>
                                </div>
                                <P>Connection received</P>
                                <P>4</P>
                            </div>
                            </Link>

                            <Link to="/active-requests">
                            <div className={`${dashboardStyles.card} ${currentPath == "/active-requests" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={activeRequest}/>
                                </div>
                                <P>Active request</P>
                                <P>1</P>
                            </div>
                            </Link>

                            <Link to="/inactive-requests">
                            <div className={`${dashboardStyles.card} ${currentPath == "/inactive-requests" ? dashboardStyles.active : ""}`}>
                                <div className={dashboardStyles.img}>
                                    <Img src={inactiveRequest}/>
                                </div>
                                <P>Inactive request</P>
                                <P>5</P>
                            </div>
                            </Link>

                        </div>
                    </div>
                    <div className={dashboardStyles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default DashboardTemplate;