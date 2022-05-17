import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import dp from './../../../images/card-display-picture.jpg';
import styles from './SingleRequest.module.css';
import backIcon from './../../../icons/back-icon.svg';
import alertIcon from './../../../icons/alert-icon.svg';
import tickSquare from './../../../icons/tick-square.svg';
import editIcon from './../../../icons/edit-icon.svg';
import Button from '../../ui/atoms/Button/Button';
import Img from '../../ui/atoms/Img/Img';
import P from '../../ui/atoms/P/P';
import { Link, useNavigate, history} from 'react-router-dom';

const SingleRequest = () => 
{
    
    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation} onClick={() => window.history.back()}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>
                <div className={styles.topBar}>
                    <div className={styles.statistics}>
                        <div className={styles.singleStatistic}>
                            <Img src={tickSquare}/>
                            <P>1 connection accepted</P>
                        </div>
                        <div className={styles.singleStatistic}>
                            <Img src={alertIcon}/>
                            <P>2 connections pending</P>
                        </div>
                    </div>
                    
                    <div className={styles.editIcon}>
                        <Button><Img src={editIcon}/><span>Edit</span></Button>
                    </div>
                </div>

                <div className={styles.imageContainer}>

                </div>

                <div className={styles.roomInfoContainer}>
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
                            <span className={styles.label}>No of roommates needed</span>
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

                    <div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Request details</span>
                            <span className={styles.value}>Female roommate needed in a self contain at Agbowo...</span>
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
                        <Button>Deactivate Request</Button>
                    </div>
                    
                </div>

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleRequest;