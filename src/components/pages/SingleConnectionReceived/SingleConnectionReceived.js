import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import { ACCEPT_CONNECTION, REJECT_CONNECTION } from '../../routes';
import dp from './../../../images/card-display-picture.jpg';
import styles from './SingleConnectionReceived.module.css';
import backIcon from './../../../icons/back-icon.svg';
import usePatch from '../../../customHooks/usePatch';
import { Link, useParams } from 'react-router-dom';
import Button from '../../ui/atoms/Button/Button';
import { useEffect, useState } from 'react';
import { UserContext } from "../../context";
import Img from './../../ui/atoms/Img/Img';
import P from './../../ui/atoms/P/P';
import { useContext} from "react";

const SingleConnectionReceived = () => 
{
    const {connectionsReceived} = useContext(UserContext);
    const {id: connection_id} = useParams();
    console.log(connection_id);
    const [connectionData, setConnectionData] = useState(null);
    console.log(connectionData);
    const [isAcceptButtonLoading, setIsAcceptButtonLoading] = useState(false);
    const [isRejectButtonLoading, setIsRejectButtonLoading] = useState(false);

    // Sending Post Request
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const {isError, isSuccess, APIData, sendPatchRequest} = usePatch(headers);
    

    const getConnection = () => 
    {
        let connection_data;

        Object.values(connectionsReceived).every((connection_type) =>
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

    /*

        IMPORTANT: DON'T ALLOW USERS TO SEND "ACCEPT REQUEST" request and while that is running, click "REJECT REQUEST"
        YOU CAN MAKE THE OTHER BUTTON DISABLED, WHILE ONE RUNS OR ELSE WE'LL JUST GIVE OURSELVES UNNECESSARY PROBLEMS

    */

    const acceptConnection = () => 
    {
        setIsAcceptButtonLoading(true);
        setIsRejectButtonLoading(false);

        const formData = new FormData();
        formData.append("status", "ACCEPTED");
        sendPatchRequest(ACCEPT_CONNECTION + connection_id + "/", formData);

        console.log("Accept connection");
    }

    const rejectConnection = () => 
    {
        setIsAcceptButtonLoading(false);
        setIsRejectButtonLoading(true);

        const formData = new FormData();
        formData.append("status", "REJECTED");
        sendPatchRequest(REJECT_CONNECTION + connection_id + "/", formData);

        console.log("Reject connection");
    }

    useEffect(() => 
    {
        // Getting Connection Data From Context
        setConnectionData(getConnection());

        // Listen for response from Accept Request
        if(isSuccess || isError)
        {
            setIsAcceptButtonLoading(false);
            setIsRejectButtonLoading(false);
        }

    }, [connection_id, isSuccess, isError, APIData]);

    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation}>
                    <Link to="/connection-received">
                        <Img src={backIcon} />
                        <span>Back</span>
                    </Link>
                </div>
                <div className={styles.profile}>
                    <Img src={connectionData ? connectionData.sender_data[0].image_url : dp}/>
                    <P>{connectionData ? connectionData.sender_data[0].fullname : "Loading..."}</P>
                </div>

                <div className={styles.userInfoContainer}>
                    <div className={styles.userInfoRow}>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Gender</span>
                            <span className={styles.value}  style={{textTransform: "capitalize"}}>{connectionData ? (connectionData.sender_data[0].gender).toLowerCase() : "Loading..."}</span>
                        </div>

                        <div className={styles.userInfo}>
                            <span className={styles.label}>Age range</span>
                            <span className={styles.value}>{connectionData ? (connectionData.sender_data[0].age_range) : "Loading..."}</span>
                        </div>
                    </div>

                    <div className={styles.userInfoRow}>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Religion</span>
                            <span className={styles.value}  style={{textTransform: "capitalize"}}>{connectionData ? (connectionData.sender_data[0].religion).toLowerCase() : "Loading..."}</span>
                        </div>

                        <div className={styles.userInfo}>
                            <span className={styles.label}>Personality</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>{connectionData ? (connectionData.sender_data[0].personality).toLowerCase() : "Loading..."}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Profession</span>
                            <span className={styles.value}>{connectionData ? (connectionData.sender_data[0].profession) : "Loading..."}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Short Bio</span>
                            <span className={styles.value}>{connectionData ? (connectionData.sender_data[0].bio) : "Loading..."}</span>
                        </div>
                    </div>

                    <div>
                        <div className={styles.userInfo}>
                            <span className={styles.label}>Request details</span>
                            <span className={styles.value}>{connectionData ? ((connectionData.roomate_request.listing_title).substring(0, 40)+"...") : "Loading..."}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <div className={styles.rejectButton}>
                        <Button 
                            handleOnClick={rejectConnection}
                            className={isRejectButtonLoading ? "isLoading" : ""}
                        >
                            {isRejectButtonLoading ? "Loading..." : "Reject Request"}
                        </Button>
                    </div>
                    <div className={styles.acceptButton}>
                        <Button
                            handleOnClick={acceptConnection}
                            className={isAcceptButtonLoading ? "isLoading" : ""}
                        >
                            {isAcceptButtonLoading ? "Loading..." : "Accept Request"}
                        </Button>
                    </div>
                </div>
                {isSuccess && <div className={styles.successMessage}>{APIData.detail}</div>}
                {isError && <div className={styles.errorMessage}>Something bad happened. Please try again</div>}
            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleConnectionReceived;