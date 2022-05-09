import globalStyles from './../../../components/globalStyles.module.css';
import connectionReceived from './../../../icons/connection-received.svg';
import inactiveRequest from './../../../icons/inactive-request.svg';
import connectionSent from './../../../icons/connection-sent.svg';
import activeRequest from './../../../icons/active-request.svg';
import Header from '../../ui/organisms/Header/Header';
import styles from './DashboardTemplate.module.css';
import Img from '../../ui/atoms/Img/Img';
import P from '../../ui/atoms/P/P';

const DashboardTemplate = () => 
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

    return (  
    <div className={styles.viewMoreRequests}>
        <Header
            links = {headerLinks}
            customStyle={{backgroundColor: '#F5F7FF'}}
        />

        <div className={`${globalStyles.body} ${styles.dashboardBody}`}>
            <div className={styles.dashboardContainer}>
                <div className={styles.sidebar}>
                    <div className={styles.image}></div>
                    <div className={styles.links}>
                        <ul></ul>
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
                            <div className={styles.card}>
                                <div className={styles.img}>
                                    <Img src={connectionSent}/>
                                </div>
                                <P>Connection sent</P>
                                <P>5</P>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.img}>
                                    <Img src={connectionReceived}/>
                                </div>
                                <P>Connection received</P>
                                <P>4</P>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.img}>
                                    <Img src={activeRequest}/>
                                </div>
                                <P>Active request</P>
                                <P>1</P>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.img}>
                                    <Img src={inactiveRequest}/>
                                </div>
                                <P>Inactive request</P>
                                <P>5</P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default DashboardTemplate;