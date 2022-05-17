import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import dp from './../../../images/card-display-picture.jpg';
import styles from './SingleConnectionReceived.module.css';
import backIcon from './../../../icons/back-icon.svg';
import Button from '../../ui/atoms/Button/Button';
import Img from './../../ui/atoms/Img/Img';
import P from './../../ui/atoms/P/P';
import { Link } from 'react-router-dom';


const SingleConnectionReceived = () => 
{
    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation}>
                    <Link to="/connection-received">
                        <Img src={backIcon} />
                        <span>Back</span>
                    </Link>
                </div>
                <div className={styles.profile}>
                    <Img src={dp}/>
                    <P>Adekoya Fiyinfoluwa</P>
                </div>

                <div className={styles.userInfoContainer}>
                    <div className={styles.userInfoRow}>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Gender</span>
                            <span className={styles.value}>Female</span>
                        </div>

                        <div className={styles.userInfo}>
                            <span className={styles.label}>Age range</span>
                            <span className={styles.value}>18 - 22</span>
                        </div>
                    </div>

                    <div className={styles.userInfoRow}>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Religion</span>
                            <span className={styles.value}>Christian</span>
                        </div>

                        <div className={styles.userInfo}>
                            <span className={styles.label}>Personality</span>
                            <span className={styles.value}>Introvert</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Profession</span>
                            <span className={styles.value}>Student</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Short Bio</span>
                            <span className={styles.value}>
                                I am a church girl and I love playing music out loud. 
                                Do not consider becoming my roommate if you hate loud music.
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Request details</span>
                            <span className={styles.value}>Female roommate needed in a self contain at Agbowo...</span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <div className={styles.rejectButton}>
                        <Button>Reject Request</Button>
                    </div>
                    <div className={styles.acceptButton}>
                        <Button>Accept Request</Button>
                    </div>
                </div>

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleConnectionReceived;