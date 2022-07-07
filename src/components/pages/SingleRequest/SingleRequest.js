import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import { ACTIVATE_ROOMMATE_REQUEST, DEACTIVATE_ROOMMATE_REQUEST, GET_SINGLE_ROOMMATE_REQUEST} from "../../routes";
import EditSingleRequestForm from "../EditSingleRequestForm/EditSingleRequestForm";
import ImageSlider from '../../ui/organisms/ImageSlider/ImageSlider';
import tickSquare from './../../../icons/tick-square.svg';
import alertIcon from './../../../icons/alert-icon.svg';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import "./../../ui/organisms/Card/sliderStyles.css"; //slider styles
import Button from '../../ui/atoms/Button/Button';
import useGet from "../../../customHooks/useGet";
import {Link, useParams} from 'react-router-dom';
import styles from './SingleRequest.module.css';
import { UserContext } from "../../context";
import Img from '../../ui/atoms/Img/Img';
import P from '../../ui/atoms/P/P';
import { useContext } from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

const SingleRequest = () => 
{
    // Get request
    const {id} = useParams();
    const token = localStorage.getItem("accessToken");
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    const {isSuccess, APIData} = useGet(url, token);

    // Getting context information for single request
    const {connectionsReceived, setConnectionsReceived} = useContext(UserContext);
    const [connectionData, setConnectionData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isCurrentlyEditting, setIsCurrentlyEditting] = useState(false);

    // Activate or deactivate request
    const updateToken = "Bearer " + token;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", updateToken);
    const {isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest} = usePatch(myHeaders);


    // Function to get the specific connection data from the list of connections in context.
    // Because of the way the data is structured, I have to search through the context data in a specific way
    // in order to get the single connection data I need.     
    const getConnection = () => 
    {
        let connection_data;

        Object.values(connectionsReceived).every((connection_type) =>
        {
            connection_type.every((single_connection) => 
            {
                if(single_connection.id == id)
                {
                    connection_data = single_connection;
                    return false;
                }
                return true;
            });

            return true;

        });       

        console.log(connection_data);

        return connection_data;
    }



    const handleBack = () => 
    {
        return !isCurrentlyEditting ? window.history.back() : setIsCurrentlyEditting(false);
    }

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
      
    const fetchFunction = async (url) => 
    {
        const res = await fetch(url, 
        {
            headers:  
            {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            } 
        });

        const body = await res.json();

        if(res.ok)
        {
            // Set context data if it is not currently available
            console.log(body);
            setConnectionsReceived(body);
        }else
        {
            console.log(body);
        }
    }


    useEffect (() => 
    {

        // console.log(APIData);

        if(updateSuccess || updateError)
        {
            setIsLoading(false);
        }
       
        // If user connections are not availble from context, get it from backend.
        // If it is available, set it in the state
        // if(connectionsReceived.length <= 0)
        // {
        //     fetchFunction(CONNECTION_RECEIVED);
        // }else 
        // {
        //     setConnectionData(getConnection());
        // }

        // if(connectionData) console.log(connectionData);
    }, [
            isSuccess,
            APIData,
            updateData,
            updateError, 
            updateSuccess, 
            connectionsReceived
        ]);

  

    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation} onClick={handleBack}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>

                {!isCurrentlyEditting &&
                <>
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
                            <Button handleOnClick={() => setIsCurrentlyEditting(true)}><Img src={editIcon}/><span>Edit</span></Button>
                        </div>
                    </div>

                    <div className={styles.requestInfo}>
                    <div>{APIData && <ImageSlider images={APIData.request_images}/>}</div>
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
                                    {(APIData ? APIData.street_address +  ", " + APIData.city + ", " + APIData.state + ", " + APIData.country : "Loading...")}
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
                        {APIData  && (APIData.is_active ? 
                                <div className={styles.rejectButton}>
                                    <Button  type="button" handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                        {isLoading ? "Loading..." : "Deactivate Request"}
                                    </Button>
                                </div>
                                :
                                <div className={styles.acceptButton}>
                                    <Button type="button" handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                        {isLoading ? "Loading..." : "Activate Request"}
                                    </Button>
                                    
                                </div>
                            )
                        }
                        
                    </div>
                        {updateSuccess && <div className={styles.successMessage}>{updateData.detail}</div>}
                        {updateError && <div className={styles.errorMessage}>Something bad happened. Please try again</div>}
                    </div>
                </>
                }

            {isCurrentlyEditting && <EditSingleRequestForm styles={styles} APIData={APIData} isCurrentlyEditting={isCurrentlyEditting} setIsCurrentlyEditting={setIsCurrentlyEditting}/>}


            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleRequest;