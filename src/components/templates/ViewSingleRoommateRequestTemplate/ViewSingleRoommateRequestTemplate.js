import mapboxgl from 'mapbox-gl'; 
import { DateTime } from 'luxon';
import P from '../../ui/atoms/P/P';
import { v4 as uuidv4 } from 'uuid';
import "mapbox-gl/dist/mapbox-gl.css";
import ShowMap from '../../pages/ShowMap';
import Gallery from "react-photo-gallery";
import Img from './../../ui/atoms/Img/Img';
import { UserContext } from '../../context';
import Lightbox from 'react-image-lightbox';
import H1 from '../../ui/atoms/Headings/H1/H1';
import H2 from '../../ui/atoms/Headings/H2/H2';
import H3 from '../../ui/atoms/Headings/H3/H3';
import Button from '../../ui/atoms/Button/Button';
import { Link, useParams } from 'react-router-dom';
import usePost from './../../../customHooks/usePost';
import Header from '../../ui/organisms/Header/Header';
import backIcon from './../../../icons/back-icon.svg';
import usePatch from './../../../customHooks/usePatch';
import washingMachine from './../../../icons/washing-machine.svg';
import styles from './ViewSingleRoommateRequestTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import SignInDialog from './../../ui/organisms/Auth/SignIn/SignInDialog';
import { useState, useCallback, useContext, useEffect, useRef} from 'react';
import displayPicture from './../../../images/view-single-roomate-display-picture.png';
import CreateAccountDialog from './../../ui/organisms/Auth/CreateAccount/CreateAccountDialog';
import {CREATE_CONNECTION_REQUEST, DEACTIVATE_ROOMMATE_REQUEST, CONNECTION_SENT} from './../../routes';
import {getMeta} from '../../../helperFunctions/getFileDimensions';

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9sYXJhbm1pamVzdXRvZnVubWkiLCJhIjoiY2wyd2NxcHE0MDV5dTNsbno3ZWMxZmJidSJ9.lnia2WE6dICt77XhejO1dQ'; 

const ViewSingleRoommateRequestTemplate = ({roommateRequest = null}) => 
{
    const {id: roommate_request_id} = useParams();
    let [isLoading, setIsLoading] = useState(false);
    const {isUserLoggedIn, userProfile, connectionsSent, setConnectionsSent} = useContext(UserContext);

    // For Map Box
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(9);

    // To check if user has previously sent a connection request to this roomate request 
    const [hasUserSentConnectionRequest, setHasUserSentConnectionRequest] = useState(false);

    // The image array for image gallery
    const [imageGallery, setImageGallery] = useState([]);

    // For creating connection request
    var myHeaders = new Headers();
    const token =  "Bearer " + localStorage.getItem("accessToken");
    myHeaders.append("Authorization", token);
    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_CONNECTION_REQUEST, myHeaders);
    const [showConnectionSuccessMessage, setShowConnectionSuccessMessage] = useState(false);

    // For deactivating roommate request
    const {isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest} = usePatch(myHeaders);

    // For Photo LightBox
    let [photoIndex, setPhotoIndex] = useState(0);
    let [isOpen, setIsOpen] = useState(false);

    // For sign in modal
    const [signInModalState, setSignInModalState] = useState(false);
    const showSignInDialog = () => setSignInModalState(true);
    const closeSignInModal = () => setSignInModalState(false);

    // //For create account modal
    const [createAccountModalState, setCreateAccountModalState] = useState(false);
    const showCreateAccountDialog = () => setCreateAccountModalState(true);
    const closeCreateAccountModal = () => setCreateAccountModalState(false);

    const openSignInModal = () => 
    {
        closeCreateAccountModal();
        showSignInDialog();
    }

    const openCreateAccountModal = () => 
    {
        closeSignInModal();
        showCreateAccountDialog();
    }


    // Formatting image information into an object the image gallery can use    
    const formatRequestImages = (request_images) => 
    {
        const getFileDimensions = async (image_url) =>
        {
            let img = await getMeta(image_url);  
            let width = img.width;
            let height = img.height;     
            setImageGallery((imageGallery) => 
            {
                return [...imageGallery, {src: image_url, width: width, height: height}]
                
            });
        }

        request_images.forEach((image) => 
        {
            <div key={uuidv4()}>
                {getFileDimensions(image.image_url)};
            </div>
        });
    }
    
    // Initializing the lightbox
    const openLightBox = useCallback((event, { photo, index }) => 
    {
        setPhotoIndex(index);
        setIsOpen(true);

    }, []);

      
    const sendConnectionRequest = () => 
    {
        //Check if user is logged in
        if(!isUserLoggedIn)
        {
            // Open Sign In Dialog
            openSignInModal();

        }else
        {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("request_id", roommateRequest.id);
            sendPostRequest(formData);
        }
    }

    const closeConnectionSuccessMessage = () =>
    {
        setShowConnectionSuccessMessage(false);
    }

    const deactivateRequest = () => 
    {
        //deactivate
        setIsLoading(true);

        //deactivate request
        const url = DEACTIVATE_ROOMMATE_REQUEST + roommate_request_id + '/'; 

        const formData = new FormData();
        formData.append("is_active", false);
        sendPatchRequest(url, formData);
    }

    const fetchConnectionSent = async (url) => 
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
            setConnectionsSent(body);
        }else
        {
            console.log(body);
        }

    }

    // function to check if user has previously sent a connection to this particular roommate request
    // Because of the way the data is structured, I have to search through the context data in a specific way
    // in order check if the user has connected to this request before.
    const checkIfUserHasSentConnectionRequest = () => 
    {
        Object.values(connectionsSent).every((connection_type) =>
        {
            connection_type.every((single_connection) => 
            {
                if(single_connection.roomate_request.id == roommate_request_id)
                {
                    setHasUserSentConnectionRequest(true);
                    return false;
                }

                return true;
            });

            return true;
        });           
    }

    useEffect(() => 
    {          
        // Get connection sent from API if it is not currently available in context
        if(isUserLoggedIn && Object.values(connectionsSent).length <= 0 )
        {
            fetchConnectionSent(CONNECTION_SENT);
        }

        if(isSuccess || isError)
        {
            setIsLoading(false);
            console.log(APIdata);
        }
         
        if(isSuccess) setShowConnectionSuccessMessage(true);

        if(updateSuccess || updateError)
        {
            setIsLoading(false);
            console.log(updateData);
        }

        if(isUserLoggedIn) checkIfUserHasSentConnectionRequest();

        if(roommateRequest && imageGallery.length<=0) 
        {
            formatRequestImages(roommateRequest.request_images);
            setLat(roommateRequest.latitude);
            setLng(roommateRequest.longitude);
        }

        console.log(imageGallery);
      }, [
        isSuccess, 
        isError,
        APIdata,
        updateSuccess,
        updateError,
        updateData,
        roommate_request_id,
        isUserLoggedIn,
        connectionsSent,
        roommateRequest,
        ]);
 

    const headerLinks = 
    [
        {
            id: 1,
            text: "Create Request",
            path: '/create-roommate-request-instruction'
        }
    ]

    return ( 
        <div className={styles.viewAll}>
             <Header
                links = {headerLinks}
                customStyle={{borderBottom: "1px solid rgba(125, 125, 125, 0.45)"}}
            />
            <div className={styles.heading}>
                <div className={styles.headingAndIcon}>
                    <Link to="/view-all-requests">
                        <Img src={backIcon}/>
                    </Link>
                    <H1>{roommateRequest ? roommateRequest.listing_title : "Loading..."}</H1>
                </div>
                <div className={styles.requestOwner}>
                    <P>Request created by <Link to={roommateRequest ? "/guest-profile/"+roommateRequest.profile.id : ""} target="_blank" className={styles.name}>
                        {roommateRequest ? roommateRequest.profile.fullname : "Loading..."}
                        </Link>
                    </P> 
                </div>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageGroup}>
                    {roommateRequest ? <Gallery photos={imageGallery} onClick={openLightBox}/> : ""}
                    {isOpen && (
                        <Lightbox
                            mainSrc={imageGallery[photoIndex].src}
                            nextSrc={imageGallery[(photoIndex + 1) % imageGallery.length].src}
                            prevSrc={imageGallery[(photoIndex + imageGallery.length - 1) % imageGallery.length].src}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex((photoIndex) => 
                                {
                                    return (photoIndex + imageGallery.length - 1) % imageGallery.length;

                                })
                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex((photoIndex) => 
                                {
                                    return (photoIndex + 1) % imageGallery.length;
                                })
                            }
                        />
                        )
                    }
                </div>
            </div>

            <div className={`${globalStyles.body} ${styles.viewSingleRequestBody}`}>
                {roommateRequest ? (
                <>            
                    <div className={styles.roomInformation}>
                        <div className={styles.topSection}>
                            <div className={styles.roomDetailsAndAmmenities}>
                                <H2>Room Details</H2>

                                <div className={styles.singleRoomInformationContainer}>
                                    <div className={styles.singleRoomInformation}>
                                        <H3>Room Type</H3>
                                        <P>{roommateRequest.room_type}</P>
                                    </div>

                                    <div className={styles.singleRoomInformation}>
                                        <H3>Rent</H3>
                                        <P>{roommateRequest.rent_per_person}</P>
                                    </div>

                                    <div className={styles.singleRoomInformation}>
                                        <H3>Other Bills</H3>
                                        <P>{roommateRequest.additional_cost}</P>
                                    </div>

                                    <div className={styles.singleRoomInformation}>
                                        <H3>Availability</H3>
                                        <P>{DateTime.fromISO(roommateRequest.date_to_move).toLocaleString(DateTime.DATE_FULL)}</P>
                                    </div>

                                    <div className={styles.singleRoomInformation}>
                                        <H3>No of person to occupy the room</H3>
                                        <P>{roommateRequest.no_of_persons}</P>
                                    </div>

                                    <div className={styles.singleRoomInformation}>
                                        <H3>No of current roommates</H3>
                                        <P>{roommateRequest.no_of_current_roomies}</P>
                                    </div>
                                </div>

                                <div className={styles.ammenitiesContainer}>
                                    <H2>Amenities</H2>

                                    <div className={styles.ammenities}>
                                        {(roommateRequest.amenities.length === 0) && <P>No ammenities available</P>}
                                        {(roommateRequest.amenities.length > 0) && roommateRequest.amenities.map((amenity) => 
                                        {
                                            return (
                                                <div key = {uuidv4()} className={styles.singleAmmenity}>
                                                    <Img src={washingMachine}/>
                                                    <P>{amenity}</P>
                                                </div>
                                            )
                                        })}
                                        
                                    </div>
                                </div>
                            </div>

                            <div className={styles.desktopOwnerInformation}>
                                <div className={styles.personalInfo}>
                                    <Img src ={roommateRequest.profile.image_url} />
                                    <span>
                                        <H3>{roommateRequest.profile.fullname}</H3>
                                        <P>{roommateRequest.profile.profession}</P>
                                    </span>
                                </div>
                                <div>
                                    <div className={styles.information}>
                                        <P>
                                            <span className={styles.infoHeading}>Age group: </span>
                                                {roommateRequest.profile.age_range + " years"}
                                        </P>
                                        <P>
                                            <span className={styles.infoHeading}>Gender: </span>
                                            {roommateRequest.profile.gender.toLowerCase()}
                                        </P>
                                        <P>
                                            <span className={styles.infoHeading}>Personality Type: </span>
                                            {roommateRequest.profile.personality.toLowerCase()}
                                        </P>
                                        <P><span className={styles.infoHeading}>Bio: </span>
                                            {(roommateRequest.profile.bio.length < 82) ?
                                                roommateRequest.profile.bio:
                                            (<>
                                                {roommateRequest.profile.bio.substr(0, 82) + "... "}
                                                <span className={styles.readMore}>Read more</span>
                                            </>
                                            )}
                                        </P>
                                    </div>
                                    {((isUserLoggedIn && (userProfile.id !== roommateRequest.profile.id)) || !isUserLoggedIn) ?
                                       <>
                                        {//if user is not the owner of the roommate request
                                        (isUserLoggedIn && hasUserSentConnectionRequest) ? 
                                            <>
                                                <Button disabled>{isLoading ? "Loading..." : "Connection Sent"}</Button>
                                                <div className={styles.connectionSentNotification}>
                                                    <div className={styles.content}>
                                                        Kindly check <Link to="/connection-sent" target="_blank">
                                                            <span style={{textDecoration: "underline", color: "#0029DD"}}>your dashboard</span></Link> for more information
                                                    </div>
                                                </div>
                                            </>
                                        :
                                            <Button 
                                            handleOnClick={sendConnectionRequest}
                                            className={isLoading ? "isLoading": ""}
                                            >{isLoading ? "Loading..." : "Connect Now"}</Button>
                                        }
                                        </>
                                        :
                                        // If user is the owner of the roommate request
                                        <Button 
                                            handleOnClick={deactivateRequest}
                                            className={isLoading ? "isLoading": ""}
                                        >{isLoading ? "Loading..." : "Deactivate Request"}</Button>
                                    }

                                    {showConnectionSuccessMessage && 
                                    <div className={styles.connectionSentNotification}>
                                        <div className={styles.content}>
                                            You have successfully sent a connection request to {roommateRequest.profile.fullname}. We will notify you when your connection request has been attended to.
                                        </div>
                                        <div className={styles.closeIcon} onClick={closeConnectionSuccessMessage}>
                                            x
                                        </div>  
                                    </div>
                                    }  
                                    {updateSuccess && <div className="successMessage">{updateData.detail}</div>}
                                </div>
                            </div>
                            
                        </div>

                        <div className={styles.location}>
                            <div>
                                <H2>Location</H2>
                                <P styles={styles.address}>{roommateRequest.street_address + ", " + roommateRequest.state + ", " + roommateRequest.country}</P>
                            </div>
                            <div className={styles.map} id="single-roommate-request-map">
                                <ShowMap 
                                    lng={lng}
                                    lat={lat}
                                    zoom={zoom}
                                />
                            </div>
                        </div>

                        <div className={styles.additionalInformation}>
                            <H2>Additional information about room</H2>
                            <P>{roommateRequest.additional_information}</P></div>
                        
                    </div>
                </>) : "Loading ..."}

                </div>
               
                {roommateRequest ? (
                <> 
                <div className={styles.mobileOwnerContainer}>
                    <div className={styles.mobileOwnerInformation}>
                        <div className={styles.personalInfo}>
                            <Img src ={roommateRequest.profile.image_url} />
                            <span>
                                <H3>{roommateRequest.profile.fullname}</H3>
                                <P>{roommateRequest.profile.profession}</P>
                            </span>
                        </div>
                        <div className={styles.buttonContainer}>
                            {/* <Button 
                                handleOnClick={sendConnectionRequest}
                                className={isLoading ? "isLoading": ""}
                            >{isLoading ? "Loading..." : "Connect Now"}</Button> */}
                                {/* if user is not the owner of the roommate request */}
                            {((isUserLoggedIn && (userProfile.id !== roommateRequest.profile.id)) || !isUserLoggedIn) ?
                                <>
                                {//If user has ssent connection request before
                                (isUserLoggedIn && hasUserSentConnectionRequest) ? 
                                    <>
                                        <Button disabled>{isLoading ? "Loading..." : "Connection Sent"}</Button>
                                    </>
                                :
                                    <Button 
                                    handleOnClick={sendConnectionRequest}
                                    className={isLoading ? "isLoading": ""}
                                    >{isLoading ? "Loading..." : "Connect Now"}</Button>
                                }
                                </>
                                :
                                // If user is the owner of the roommate request
                                <Button 
                                    handleOnClick={deactivateRequest}
                                    className={isLoading ? "isLoading": ""}
                                >{isLoading ? "Loading..." : "Deactivate Request"}</Button>
                                }
                        </div>
                        </div>
                        {//If user has sent connection request before
                        (isUserLoggedIn && hasUserSentConnectionRequest) && 
                        <div className={styles.connectionSentNotification}>
                            <div className={styles.content}>
                                Kindly check <Link to="/connection-sent" target="_blank">
                                    <span style={{textDecoration: "underline", color: "#0029DD"}}>your dashboard</span></Link> for more information
                            </div>
                        </div>
                        }
                        {//On successful connection sent
                        (showConnectionSuccessMessage) && 
                        <div className="successMessage">
                            You have successfully sent a connection request to "{roommateRequest.profile.fullname}" and you will be notified when your connection request has been attended to.
                        </div>
                        }
                        {//If user has ssent connection request before
                        (updateSuccess) && <div className="successMessage">{updateData.detail}</div>
                        }
                    </div>
                </>) : "Loading ..."}

            <SignInDialog 
                open={signInModalState} 
                closeModal={closeSignInModal}
                openCreateAccountModal={openCreateAccountModal}
                redirectTo = {window.location.pathname}
                message = "You need to login before you can make a connection request"
            />

            <CreateAccountDialog 
                open={createAccountModalState}
                closeModal={closeCreateAccountModal}
                openSignInModal={openSignInModal}
                redirectTo = {window.location.pathname}
                message = "You need to login before you can make a connection request"
            />

        </div>
     );
}
 
export default ViewSingleRoommateRequestTemplate;