import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import { ACTIVATE_ROOMMATE_REQUEST, DEACTIVATE_ROOMMATE_REQUEST } from "../../routes";
import { GET_SINGLE_ROOMMATE_REQUEST } from "../../routes";
import tickSquare from './../../../icons/tick-square.svg';
import alertIcon from './../../../icons/alert-icon.svg';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import "./../../ui/organisms/Card/sliderStyles.css"; //slider styles
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import Button from '../../ui/atoms/Button/Button';
import Select from '../../ui/atoms/Select/Select';
import useGet from "../../../customHooks/useGet";
import {Link, useParams} from 'react-router-dom';
import styles from './SingleRequest.module.css';
import { Navigation, Pagination } from "swiper";
import Lightbox from 'react-image-lightbox';
import Img from '../../ui/atoms/Img/Img';
import { v4 as uuidv4 } from 'uuid';
import P from '../../ui/atoms/P/P';
import { useEffect } from 'react';
import { useState } from 'react';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Input from '../../ui/atoms/Input/Input';
import Textarea from '../../ui/atoms/Textarea/Textarea';


const SingleRequest = () => 
{
    // Get request
    const {id} = useParams();
    const token = localStorage.getItem("accessToken");
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    const {APIData} = useGet(url, token);
    const [isCurrentlyEditting, setIsCurrentlyEditting] = useState(false);
    
    // Activate or deactivate request
    const updateToken = "Bearer " + token;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", updateToken);
    const {isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest} = usePatch(myHeaders);


    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = () => 
    {
        setIsLoading(true);

        //deactivate request
        if(APIData && APIData.is_active)
        {
            const url = DEACTIVATE_ROOMMATE_REQUEST + id + '/'; 

            const formData = new FormData();
            formData.append("is_active", false);

            sendPatchRequest(url, formData);
        }

        //activate request
        if(APIData && !APIData.is_active)
        {
            const url = ACTIVATE_ROOMMATE_REQUEST + id + '/'; 

            const formData = new FormData();
            formData.append("is_active", true);

            sendPatchRequest(url, formData);
        }
    }

    useEffect (() => 
    {
        if(updateSuccess || updateError) setIsLoading(false);

        console.log(updateData);

    }, [updateData, updateSuccess, updateError]);

    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const requestImages = APIData && APIData.request_images;

    const openLightBox = (index) => 
    {
        setIsLightBoxOpen(true);//open lightbox
        setPhotoIndex(index);
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
                        {!isCurrentlyEditting && 
                        <Button handleOnClick={() => setIsCurrentlyEditting(true)}><Img src={editIcon}/><span>Edit</span></Button>
                        }
                        
                    </div>
                </div>

                <div className={styles.imageContainer}>
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {APIData && requestImages.map((imageLink, index) => 
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
                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Room Type</span>
                            {isCurrentlyEditting && 
                            <Select defaultValue={APIData ? APIData.room_type : ""}>        
                                <option value={"Self Contain"}>Self Contain</option>
                                <option value={"2 Bedroom Flat"}>2 Bedroom Flat</option>
                                <option value={"3 Bedroom Flat"}>3 Bedroom Flat</option>
                                <option value={"Shortlet"}>Shortlet</option>
                                <option value={"Single Room Apartment"}>Single Room Apartment</option>
                            </Select>}
                            {!isCurrentlyEditting && 
                            <span className={styles.value}>{APIData ? APIData.room_type : "Loading..."}</span>
                            }
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Rent</span>
                            {isCurrentlyEditting &&<>
                            ₦ <Input defaultValue={APIData ? APIData.rent_per_person : ""}/> /Year</>}
                            {!isCurrentlyEditting && 
                            <span className={styles.value}>{APIData ? "₦ " + APIData.rent_per_person + "/Year": "Loading..."}</span>
                            }
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Other bills</span>
                            {isCurrentlyEditting && <Textarea
                                defaultValue={APIData ? APIData.additional_cost : ""}
                            >
                            </Textarea>}
                            {!isCurrentlyEditting &&
                            <span className={styles.value}>{APIData ? APIData.additional_cost : "Loading..."}</span>
                            }
                        </div>

                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Availability</span>
                            {isCurrentlyEditting &&
                            <Input type="date" defaultValue={APIData ? APIData.date_to_move : "Loading..."} />
                            }
                            {!isCurrentlyEditting &&
                            <span className={styles.value}>{APIData ? APIData.date_to_move : "Loading..."}</span>
                            }
                        </div>
                    </div>

                    <div className={styles.roomInfoRow}>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of person to occupy the room</span>
                            {isCurrentlyEditting && 
                            <Input type="number" defaultValue={APIData ? APIData.no_of_persons : ""} />}
                            {!isCurrentlyEditting &&
                            <span className={styles.value}>{APIData ? APIData.no_of_persons : "Loading..."}</span>
                            }
                        </div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>No of current roommates</span>
                            {isCurrentlyEditting &&
                            <Input type="number" defaultValue={APIData ? APIData.no_of_current_roomies : ""} />
                            }
                            {!isCurrentlyEditting &&
                            <span className={styles.value}>{APIData ? APIData.no_of_current_roomies : "Loading..."}</span>
                            }
                        </div>
                    </div>

                    <div>
                        <div className={styles.roomInfo}>
                            <span className={styles.label}>Location</span>
                            <span className={styles.value}>
                            {isCurrentlyEditting &&
                            <div>
                                <div>
                                    <span>Country</span>
                                    <Select defaultValue={APIData ? APIData.country : ""}>
                                        <option>Nigeria</option>
                                        <option>South Africa</option>
                                    </Select>
                                </div>
                                <div>
                                    <span>State</span>
                                    <Select defaultValue={APIData ? APIData.state : ""}>
                                        <option>Nigeria</option>
                                        <option>South Africa</option>
                                    </Select>
                                </div>
                                <div>
                                    <span>Street Address</span>
                                    <Textarea
                                        defaultValue={APIData ? APIData.street_address : ""}
                                    >
                                    </Textarea>
                                </div>
                                </div>
                            }
                            {!isCurrentlyEditting &&
                            (APIData ? APIData.street_address + ", " + APIData.state + ", " + APIData.country : "Loading...")  }
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className={styles.buttonGroup}>
                {!isCurrentlyEditting && 
                    <div className={styles.viewRequest}>
                        <Link to={APIData ? `/roommate-request/${APIData.id}` : '/'}>
                            View Request Page
                        </Link>
                    </div>
                }
                    {(APIData &&!isCurrentlyEditting) &&
                        (APIData.is_active ? 
                            <div className={styles.rejectButton}>
                                <Button handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                    {isLoading ? "Loading..." : "Deactivate Request"}
                                </Button>
                            </div>
                            :
                            <div className={styles.acceptButton}>
                                <Button handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                    {isLoading ? "Loading..." : "Activate Request"}
                                </Button>
                                
                            </div>
                        )
                    }
                    
                </div>
                {isCurrentlyEditting && 
                    <Button customStyle={{float: "right"}} stylehandleOnClick={() => setIsCurrentlyEditting(false)}><span>Update</span></Button>
                }
                {updateSuccess && <div className={styles.successMessage}>{updateData.detail}</div>}
                {updateError && <div className={styles.errorMessage}>Something bad happened. Please try again</div>}

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleRequest;