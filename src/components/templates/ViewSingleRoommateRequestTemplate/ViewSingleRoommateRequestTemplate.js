import mapboxgl from 'mapbox-gl';
import P from '../../ui/atoms/P/P';
import { v4 as uuidv4 } from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
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
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import washingMachine from './../../../icons/washing-machine.svg';
import { useState, useCallback, useContext, useEffect} from 'react';
import styles from './ViewSingleRoommateRequestTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import SignInDialog from './../../ui/organisms/Auth/SignIn/SignInDialog';
import displayPicture from './../../../images/view-single-roomate-display-picture.png';
import CreateAccountDialog from './../../ui/organisms/Auth/CreateAccount/CreateAccountDialog';
import {CREATE_CONNECTION_REQUEST, DEACTIVATE_ROOMMATE_REQUEST, CONNECTION_SENT} from './../../routes';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const ViewSingleRoommateRequestTemplate = ({roommateRequest = null}) => 
{
    const {id: roommate_request_id} = useParams();
    let [isLoading, setIsLoading] = useState(false);
    const {isUserLoggedIn, userProfile, connectionsSent, setConnectionsSent} = useContext(UserContext);

    // To check if user has previously sent a connection request to this roomate request 
    const [hasUserSentConnectionRequest, setHasUserSentConnectionRequest] = useState(false);

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
    let image_array = [];
    if (roommateRequest)
    {   
        roommateRequest.request_images.forEach((image) => 
        {
            <div key={uuidv4()}>
                {image_array.push({src: image.image_url, width: 1, height: 1})}
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
            console.log("Set connections sent");
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
        if(Object.values(connectionsSent).length <= 0 )
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

      }, [isSuccess, isError, APIdata, updateSuccess, updateError, updateData, roommate_request_id, isUserLoggedIn, connectionsSent]);
 
    const Map = ReactMapboxGl({accessToken: 'pk.eyJ1IjoiZm9sYXJhbm1pamVzdXRvZnVubWkiLCJhIjoiY2wyd2NxcHE0MDV5dTNsbno3ZWMxZmJidSJ9.lnia2WE6dICt77XhejO1dQ'}); 


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
                        <P>Request created by <span className={styles.name}>
                            {roommateRequest ? roommateRequest.profile.fullname : "Loading..."}
                            </span>
                        </P> 
                </div>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageGroup}>
                    {roommateRequest ? <Gallery photos={image_array} onClick={openLightBox}/> : ""}
                    {isOpen && (
                        <Lightbox
                            mainSrc={image_array[photoIndex].src}
                            nextSrc={image_array[(photoIndex + 1) % image_array.length].src}
                            prevSrc={image_array[(photoIndex + image_array.length - 1) % image_array.length].src}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex((photoIndex) => 
                                {
                                    return (photoIndex + image_array.length - 1) % image_array.length;

                                })
                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex((photoIndex) => 
                                {
                                    return (photoIndex + 1) % image_array.length;
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
                                        <P>{roommateRequest.date_to_move}</P>
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
                                {/* <Map
                                    style="mapbox://styles/mapbox/streets-v9"
                                    containerStyle={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: 'inherit'
                                    }}
                                    >
                                
                                    <Layer type="line" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                                        <Feature coordinates={[roommateRequest.longitude, roommateRequest.latitude]} />
                                    </Layer>
                                </Map> */}
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
                    <div className={styles.mobileOwnerInformation}>
                        <div className={styles.personalInfo}>
                            <Img src ={displayPicture} />
                            <span>
                                <H3>Precious Faseyosan</H3>
                                <P>Student</P>
                            </span>
                        </div>
                        <div>
                        <Button 
                            handleOnClick={sendConnectionRequest}
                            className={isLoading ? "isLoading": ""}
                        >{isLoading ? "Loading..." : "Connect Now"}</Button>
                        </div>
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