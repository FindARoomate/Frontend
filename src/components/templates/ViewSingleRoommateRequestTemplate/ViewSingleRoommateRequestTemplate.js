import { DateTime } from 'luxon';
import P from '../../ui/atoms/P/P';
import { v4 as uuidv4 } from 'uuid';
import Img from './../../ui/atoms/Img/Img';
import { UserContext } from '../../context';
import H1 from '../../ui/atoms/Headings/H1/H1';
import H2 from '../../ui/atoms/Headings/H2/H2';
import H3 from '../../ui/atoms/Headings/H3/H3';
import { CONNECTION_SENT } from './../../routes';
import { Link, useParams } from 'react-router-dom';
import Header from '../../ui/organisms/Header/Header';
import backIcon from './../../../icons/back-icon.svg';
import { useState, useContext, useEffect } from 'react';
import DisplayMap from '../../ui/organisms/DisplayMap/DisplayMap';
import washingMachine from './../../../icons/washing-machine.svg';
import styles from './ViewSingleRoommateRequestTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import SignInDialog from './../../ui/organisms/Auth/SignIn/SignInDialog';
import DisplayGallery from '../../ui/organisms/DisplayGallery/DisplayGallery';
import CreateAccountDialog from './../../ui/organisms/Auth/CreateAccount/CreateAccountDialog';
import DesktopRoommateRequestOwnerInfo from '../../ui/organisms/DesktopRoommateRequestOwnerInfo/DesktopRoommateRequestOwnerInfo';
import MobileRoommateRequestOwnerInfo from '../../ui/organisms/MobileRoommateRequestOwnerInfo/MobileRoommateRequestOwnerInfo';


const ViewSingleRoommateRequestTemplate = ({roommateRequest = null}) => 
{
    const { id: roommate_request_id } = useParams();
    const { isUserLoggedIn, userProfile, connectionsSent, setConnectionsSent } = useContext(UserContext);

    // To check if user has previously sent a connection request to this roomate request 
    const [ hasUserSentConnectionRequest, setHasUserSentConnectionRequest ] = useState(false);

    // For sign in modal
    const [ signInModalState, setSignInModalState ] = useState(false);
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

        if(isUserLoggedIn) checkIfUserHasSentConnectionRequest();
        
      }, [
        isUserLoggedIn,
        connectionsSent,
        hasUserSentConnectionRequest
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
                    {roommateRequest ? <DisplayGallery request_images={roommateRequest.request_images}/> : ""}
                </div>
            </div>

            <div className={`${globalStyles.body} ${styles.viewSingleRequestBody}`}>
                {roommateRequest && (
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

                        <DesktopRoommateRequestOwnerInfo 
                            styles={styles} 
                            roommateRequest={roommateRequest}
                            openSignInModal={openSignInModal}
                            hasUserSentConnectionRequest={hasUserSentConnectionRequest}
                        />
                            
                        </div>

                        <div className={styles.location}>
                            <div>
                                <H2>Location</H2>
                                <P styles={styles.address}>{roommateRequest.street_address + ", " + roommateRequest.city + ", " + roommateRequest.state + ", " + roommateRequest.country}</P>
                            </div>
                            <div className={styles.map} id="single-roommate-request-map">
                                <DisplayMap
                                    lng={roommateRequest.longitude}
                                    lat={roommateRequest.latitude}
                                />
                            </div>
                        </div>

                        <div className={styles.additionalInformation}>
                            <H2>Additional information about room</H2>
                            <P>{roommateRequest.additional_information}</P></div>
                        
                    </div>
                </>)}

                </div>
               
                {roommateRequest &&
                    <MobileRoommateRequestOwnerInfo 
                        styles={styles}
                        roommateRequest={roommateRequest}
                        openSignInModal={openSignInModal}
                        hasUserSentConnectionRequest={hasUserSentConnectionRequest}
                    />
                }

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