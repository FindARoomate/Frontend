import SingleConnectionReceivedTemplate from '../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import { GET_SINGLE_ROOMMATE_REQUEST } from "../../routes";
import tickSquare from './../../../icons/tick-square.svg';
import alertIcon from './../../../icons/alert-icon.svg';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import Button from '../../ui/atoms/Button/Button';
import useGet from "../../../customHooks/useGet";
import {Link, useParams} from 'react-router-dom';
import styles from './SingleRequestTemplate.module.css';
import Img from '../../ui/atoms/Img/Img';
import P from '../../ui/atoms/P/P';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper cardStyles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./../../ui/organisms/Card/sliderStyles.css";


// import required modules
import { Navigation, Pagination } from "swiper";
import { v4 as uuidv4 } from 'uuid';


const SingleRequest = ({btnText, handleButtonOnClick}) => 
{


    const {id} = useParams();

    const token = localStorage.getItem("accessToken");
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    const {APIData} = useGet(url, token);

    const handleOnClick = () => 
    {
        if(handleButtonOnClick)
        {
            handleButtonOnClick(id)
        }
    }

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
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {APIData && APIData.request_images.map((imageLink) => 
                    {
                        return (
                        <SwiperSlide key={uuidv4()}>
                            <Img 
                                src={imageLink.image_url}
                            />
                        </SwiperSlide>
                        )
                        
                    })
                    }
                   
                </Swiper>
                </div>

                <div className={styles.roomInfoContainer}>
                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Room Type</span>
                            <span className={styles.value}>{APIData ? APIData.room_type : "Loading..."}</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Rent</span>
                            <span className={styles.value}>{APIData ? "₦ " + APIData.rent_per_person + "/Year": "Loading..."}</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Other bills</span>
                            <span className={styles.value}>{APIData ? APIData.additional_cost : "Loading..."}</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Availability</span>
                            <span className={styles.value}>{APIData ? APIData.date_to_move : "Loading..."}</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of person to occupy the room</span>
                            <span className={styles.value}>{APIData ? APIData.no_of_persons : "Loading..."}</span>
                        </div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of current roommates</span>
                            <span className={styles.value}>{APIData ? APIData.no_of_current_roomies : "Loading..."}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Location</span>
                            <span className={styles.value}>
                            {APIData ? APIData.street_address + ", " + APIData.state + ", " + APIData.country : "Loading..."}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <div className={styles.viewRequest}>
                        <Link to={APIData ? `/roommate-request/${APIData.id}` : '/'}>
                            View Request Page
                        </Link>
                    </div>
                    <div className={styles.rejectButton}>
                        <Button handleOnClick={handleOnClick}>{btnText}</Button>
                    </div>
                    
                </div>

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleRequest;