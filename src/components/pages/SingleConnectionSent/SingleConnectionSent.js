import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import dp from './../../../images/card-display-picture.jpg';
import { useContext, useState, useEffect} from "react";
import styles from './SingleConnectionSent.module.css';
import backIcon from './../../../icons/back-icon.svg';
import "./../../ui/organisms/Card/sliderStyles.css"; //slider styles
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import Button from '../../ui/atoms/Button/Button';
import { Link, useParams} from 'react-router-dom';
import { Navigation, Pagination } from "swiper";
import H2 from '../../ui/atoms/Headings/H2/H2';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Lightbox from 'react-image-lightbox';
import { UserContext } from "../../context";
import Img from '../../ui/atoms/Img/Img';
import { v4 as uuidv4 } from 'uuid';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const SingleConnectionSent = () => 
{
    const {connectionsSent} = useContext(UserContext);
    const {id: connection_id} = useParams();
    const [connectionData, setConnectionData] = useState(null);
    console.log(connectionData);

    const getConnection = () => 
    {
        let connection_data;

        Object.values(connectionsSent).every((connection_type) =>
        {
            connection_type.every((single_connection) => 
            {
                if(single_connection.id == connection_id)
                {
                    connection_data = single_connection;
                    return false;
                }

                console.log(single_connection);
                return true;
            });

            return true;
        });       

        return connection_data;
    }

    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const requestImages = connectionData && connectionData.roomate_request.request_images;

    const openLightBox = (index) => 
    {
        setIsLightBoxOpen(true);//open lightbox
        setPhotoIndex(index);
    }

    useEffect(() => 
    {
        setConnectionData(getConnection());
        
    }, [connection_id]);


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
                        <Img src={connectionData ? connectionData.roomate_request.profile.image_url : dp}/>
                        <div className={styles.profileContent}>
                            <div className={styles.userInfo}>
                                <b>Name:</b>{connectionData ? connectionData.roomate_request.profile.fullname : "Loading..."}
                            </div>
                            <div className={styles.userInfo}>
                                <b>Age group: </b> {connectionData ? connectionData.roomate_request.profile.age_range : "Loading..."}
                            </div>
                            <div className={styles.userInfo}>
                                <b>Profession:</b> {connectionData ? connectionData.roomate_request.profile.profession : "Loading..."}
                            </div>
                            <div className={styles.userInfo}
                                style={{textTransform: "capitalize"}}
                            >
                                <b>Gender: </b> {connectionData ? connectionData.roomate_request.profile.gender.toLowerCase() : "Loading..."}
                            </div>
                            <div className={styles.userInfo}
                                style={{textTransform: "capitalize"}}
                            >
                                <b>Personality Type: </b> {connectionData ? connectionData.roomate_request.profile.personality.toLowerCase() : "Loading..."}
                            </div>
                            <div className={styles.userInfo}>
                                <b>Bio: </b>{connectionData ? connectionData.roomate_request.profile.bio.substr(0, 82) + "...Read more": "Loading..."}
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className={styles.imageContainer}>
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {connectionData && requestImages.map((imageLink, index) => 
                    {
                        return (
                        <SwiperSlide key={uuidv4()}>
                            <Img 
                                src={imageLink.image_url}
                                onClick = {() => openLightBox(index)}
                            />
                        </SwiperSlide>
                        )
                        
                    })
                    }
                   
                </Swiper>
                {isLightBoxOpen && (
                    <Lightbox
                        mainSrc={requestImages[photoIndex].image_url}
                        nextSrc={requestImages[(photoIndex + 1) % requestImages.length].image_url}
                        prevSrc={requestImages[(photoIndex + requestImages.length - 1) % requestImages.length].image_url}
                        onCloseRequest={() => setIsLightBoxOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex) => 
                            {
                                return (photoIndex + requestImages.length - 1) % requestImages.length;

                            })
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex) => 
                            {
                                return (photoIndex + 1) % requestImages.length;
                            })
                        }
                    />
                    )
                    }
                </div>

                <div className={styles.roomInfoContainer}>
                    <H2>Room Details</H2>
                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Room Type</span>
                            <span className={styles.value}>{connectionData ? connectionData.roomate_request.room_type : "Loading..."}</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Rent (Per Person)</span>
                            <span className={styles.value}>{connectionData ? "₦" + connectionData.roomate_request.rent_per_person + "/Year" : "Loading..."}</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Other bills</span>
                            <span className={styles.value}>{connectionData ? connectionData.roomate_request.additional_cost : "Loading..."}</span>
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Availability</span>
                            <span className={styles.value}>{connectionData ? connectionData.roomate_request.date_to_move : "Loading..."}</span>
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of person to occupy the room</span>
                            <span className={styles.value}>{connectionData ? connectionData.roomate_request.no_of_persons : "Loading..."}</span>
                        </div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of current roommates</span>
                            <span className={styles.value}>{connectionData ? connectionData.roomate_request.no_of_current_roomies : "Loading..."}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Location</span>
                            <span className={styles.value}>
                            {
                                connectionData ?
                                connectionData.roomate_request.street_address + ", " + connectionData.roomate_request.state + ", " + connectionData.roomate_request.country + "." :
                                "Loading..."
                            }
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <div className={styles.viewRequest}>
                        <Link to={connectionData ? "/roommate-request/" + connectionData.roomate_request.id : ""}>
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