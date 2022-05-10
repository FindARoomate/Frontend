import connectionReceived from './../../../icons/connection-received.svg';
import globalStyles from './../../../components/globalStyles.module.css';
import inactiveRequest from './../../../icons/inactive-request.svg';
import connectionSent from './../../../icons/connection-sent.svg';
import activeRequest from './../../../icons/active-request.svg';
import dashboardImg from './../../../images/dashboard-image.png';
import overviewIcon from './../../../icons/overview-icon.svg';
import Header from '../../ui/organisms/Header/Header';
import styles from './DashboardTemplate.module.css';
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
    console.log(currentPath);

    return (  
    <div className={styles.viewMoreRequests}>
        <Header
            links = {headerLinks}
            customStyle={{backgroundColor: '#F5F7FF',position:'fixed'}}
        />

        <div className={`${globalStyles.body} ${styles.dashboardBody}`}>
            <div className={styles.dashboardContainer}>
                <div className={styles.sidebarContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.image}>
                        <Img src={dashboardImg}/>
                        <div className={styles.overlay}></div>
                    </div>
                    <div className={styles.links}>
                        <ul>
                            <li className= {currentPath == "/dashboard" ? styles.active : ""} >
                                <Link to="/dashboard">
                                    <span className={styles.icon}><Img src={overviewIcon}/></span>
                                    <span className={styles.text}>Overview</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/connection-sent" ? styles.active : ""} >
                                <Link to="/connection-sent">
                                    <span className={styles.icon}><Img src={connectionSent}/></span>
                                    <span className={styles.text}>Connection sent</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/connection-received" ? styles.active : ""} >
                                <Link to="/connection-received">
                                    <span className={styles.icon}><Img src={connectionReceived}/></span>
                                    <span className={styles.text}>Connection received</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/active-requests" ? styles.active : ""} >
                                <Link to="/active-requests">
                                    <span className={styles.icon}><Img src={activeRequest}/></span>
                                    <span className={styles.text}>Active Request</span>
                                </Link>
                            </li>
                            <li className= {currentPath == "/inactive-requests" ? styles.active : ""} >
                                <Link to="/inactive-requests">
                                    <span className={styles.icon}><Img src={inactiveRequest}/></span>
                                    <span className={styles.text}>Inactive request</span>
                                </Link>
                            </li>
                        </ul>
                        <div className={styles.logout}>
                            <Link to="/">
                                <span className={styles.icon}><Img src={overviewIcon}/></span>
                                <span className={styles.text}>Logout</span>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.welcomePanel}>
                        <div className={styles.welcomeMessage}>
                            <P>Welcome back Precious</P>
                            <P>Here is an overview of your activities</P>
                        </div>
                        <div className={styles.notification}></div>
                    </div>

                    <div className={styles.contentBody}>
                        <div className={styles.dashboardCards}>
                            <Link to="/connection-sent">
                                <div className={`${styles.card} ${currentPath == "/connection-sent" ? styles.active : ""}`}>
                                    <div className={styles.img}>
                                        <Img src={connectionSent}/>
                                    </div>
                                    <P>Connection sent</P>
                                    <P>5</P>
                                </div>
                            </Link>

                           <Link to="/connection-received">
                            <div className={`${styles.card} ${currentPath == "/connection-received" ? styles.active : ""}`}>
                                <div className={styles.img}>
                                    <Img src={connectionReceived}/>
                                </div>
                                <P>Connection received</P>
                                <P>4</P>
                            </div>
                            </Link>

                            <Link to="/active-requests">
                            <div className={`${styles.card} ${currentPath == "/active-requests" ? styles.active : ""}`}>
                                <div className={styles.img}>
                                    <Img src={activeRequest}/>
                                </div>
                                <P>Active request</P>
                                <P>1</P>
                            </div>
                            </Link>

                            <Link to="/inactive-requests">
                            <div className={`${styles.card} ${currentPath == "/inactive-requests" ? styles.active : ""}`}>
                                <div className={styles.img}>
                                    <Img src={inactiveRequest}/>
                                </div>
                                <P>Inactive request</P>
                                <P>5</P>
                            </div>
                            </Link>

                        </div>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default DashboardTemplate;