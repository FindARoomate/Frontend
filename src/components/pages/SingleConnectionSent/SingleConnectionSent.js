import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import dp from './../../../images/card-display-picture.jpg';
import styles from './SingleConnectionSent.module.css';
import backIcon from './../../../icons/back-icon.svg';
import Button from '../../ui/atoms/Button/Button';
import H1 from '../../ui/atoms/Headings/H1/H1';
import H2 from '../../ui/atoms/Headings/H2/H2';
import Img from '../../ui/atoms/Img/Img';
import { Link } from 'react-router-dom';


const SingleConnectionSent = () => 
{
    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation}>
                    <Link to="/connection-sent">
                        <Img src={backIcon} />
                        <span>Back</span>
                    </Link>
                </div>
                <div className={styles.profileContainer}>
                    <H1>Roommate's Profile</H1>
                    <div className={styles.profile}>
                        <Img src={dp}/>
                        <div className={styles.profileContent}>
                            <div className={styles.userInfo}>
                                <b>Name:</b>Precious Faseyosan
                            </div>
                            <div className={styles.userInfo}>
                                <b>Age group: </b> 20 - 25 years
                            </div>
                            <div className={styles.userInfo}>
                                <b>Profession:</b> Student
                            </div>
                            <div className={styles.userInfo}>
                                <b>Gender: </b> Female
                            </div>
                            <div className={styles.userInfo}>
                                <b>Personality Type: </b> Introvert
                            </div>
                            <div className={styles.userInfo}>
                                <b>Bio:</b> I am a church girl. I sleep for 10 hours everyday. I cannot live with someone with... Read more
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className={styles.imageContainer}>

                </div>

                <div className={styles.roomInfoContainer}>
                    <H2>Room Details</H2>
                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Room Type</span>
                            <span className={styles.value}>2 Bedroom Flat</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Rent</span>
                            <span className={styles.value}>₦100,000.00/Year</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Other bills</span>
                            <span className={styles.value}>₦10,000.00 Monthly Electricity</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Availability</span>
                            <span className={styles.value}>1st, May 2022</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of person to occupy the room</span>
                            <span className={styles.value}>2</span>
                        </div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of roommate needed</span>
                            <span className={styles.value}>2</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Location</span>
                            <span className={styles.value}>
                            12, Alagbaka street, Akure Ondo State, Nigeria
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <div className={styles.viewRequest}>
                        <Link to="/">
                            View Request Page
                        </Link>
                    </div>
                    <div className={styles.rejectButton}>
                        <Button>Cancel Connection Request</Button>
                    </div>
                    
                </div>

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleConnectionSent;