import P from "../../atoms/P/P";
import Img from "../../atoms/Img/Img";
import H3 from "../../atoms/Headings/H3/H3";
import { UserContext } from "../../../context";
import Button from "../../atoms/Button/Button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import usePatch from "../../../../customHooks/usePatch"; 
import { DEACTIVATE_ROOMMATE_REQUEST } from "../../../routes";
import { useSendConnectionRequestData } from "../../../../customHooks/useConnectionRequestData";

const DesktopRoommateRequestOwnerInfo = ({styles, roommateRequest, openSignInModal, hasUserSentConnectionRequest}) => 
{
    const { id: roommate_request_id } = useParams();
    const [ isDeactivateLoading, setIsDeactivateLoading ] = useState(false);

    // For setting the bio of the roommate request owner
    const [roommateRequestOwnerBio, setRoommateRequestOwnerBio] = useState("");
    const [isFullBioShowing, setIsFullBioShowing] = useState(false);

    const { isUserLoggedIn, userProfile, connectionsSent, setConnectionsSent } = useContext(UserContext);

    // For creating connection request
    const {isError, isSuccess, data: APIdata, isLoading, mutate} = useSendConnectionRequestData();
    const [showConnectionSuccessMessage, setShowConnectionSuccessMessage] = useState(false);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const {isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest} = usePatch(myHeaders);


    // To check if user has previously sent a connection request to this roomate request 
    const closeConnectionSuccessMessage = () =>
    {
        setShowConnectionSuccessMessage(false);
    }

    // Show full bio of the roommate request creator
    const showFullBio = () => 
    {
        setRoommateRequestOwnerBio(roommateRequest.profile.bio);
        setIsFullBioShowing(true);
    }
 
    const sendConnectionRequest = () => 
    {
        //Check if user is logged in
        if(!isUserLoggedIn)
        {
            // Open Sign In Dialog
            openSignInModal();

        }else
        {
            const formData = new FormData();
            formData.append("request_id", roommateRequest.id);
            mutate(formData);
        }
    }

    const deactivateRequest = () => 
    {
        //deactivate
        setIsDeactivateLoading(true);

        //deactivate request
        const url = DEACTIVATE_ROOMMATE_REQUEST + roommate_request_id + '/'; 

        const formData = new FormData();
        formData.append("is_active", false);
        sendPatchRequest(url, formData);
    }

    useEffect(() => 
    {
        if(isSuccess) setShowConnectionSuccessMessage(true);

        if(updateSuccess || updateError)
        {
            setIsDeactivateLoading(false);
        }

        if(roommateRequest && roommateRequestOwnerBio.length == 0)
        {
            (roommateRequest.profile.bio.length < 82) ? setIsFullBioShowing(true) : setIsFullBioShowing(false);
            setRoommateRequestOwnerBio(roommateRequest.profile.bio.substr(0, 82));
        } 

    }, [roommateRequest, updateError, updateSuccess]);
    return (

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
                {roommateRequestOwnerBio}
                {!isFullBioShowing && <> ... <span className={styles.readMore} onClick={showFullBio}>Read more</span></>}
            </P>
        </div>
        
        {((isUserLoggedIn && (userProfile.id !== roommateRequest.profile.id)) || !isUserLoggedIn) ?
           <>
            {//if user is not the owner of the roommate request
            (isUserLoggedIn && hasUserSentConnectionRequest) || (isUserLoggedIn && isSuccess)? 
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
                className={isDeactivateLoading ? "isLoading": ""}
            >{isDeactivateLoading ? "Loading..." : "Deactivate Request"}</Button>
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
    )

}
 
export default DesktopRoommateRequestOwnerInfo;