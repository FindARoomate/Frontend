import P from "../../atoms/P/P";
import Img from "../../atoms/Img/Img";
import H3 from "../../atoms/Headings/H3/H3";
import Button from "../../atoms/Button/Button";
import { UserContext } from "../../../context";
import { Link, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import usePatch from "../../../../customHooks/usePatch";
import { DEACTIVATE_ROOMMATE_REQUEST } from "../../../routes";
import { useSendConnectionRequestData } from "../../../../customHooks/useRoommateRequestData";

const MobileRoommateRequestOwnerInfo = ({styles, roommateRequest, openSignInModal, hasUserSentConnectionRequest}) => 
{

    const { id: roommate_request_id } = useParams();
    const [ isDeactivateLoading, setIsDeactivateLoading ] = useState(false);

    const { isUserLoggedIn, userProfile, connectionsSent, setConnectionsSent } = useContext(UserContext);
    const {isError, isSuccess, data: APIdata, isLoading, mutate} = useSendConnectionRequestData();
    const [showConnectionSuccessMessage, setShowConnectionSuccessMessage] = useState(false);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const { isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest } = usePatch(myHeaders);

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

    return ( 
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
                                ((isUserLoggedIn && hasUserSentConnectionRequest) || (isUserLoggedIn && isSuccess)) ? 
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
                                    className={isDeactivateLoading ? "isLoading": ""}
                                >{isDeactivateLoading ? "Loading..." : "Deactivate Request"}</Button>
                                }
                        </div>
                        </div>
                        {//If user has sent connection request before
                        ((isUserLoggedIn && hasUserSentConnectionRequest) || (isUserLoggedIn && isSuccess)) && 
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
                </>
     );
}
 
export default MobileRoommateRequestOwnerInfo;