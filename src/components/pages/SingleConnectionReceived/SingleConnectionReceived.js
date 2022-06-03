import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import dp from './../../../images/card-display-picture.jpg';
import styles from './SingleConnectionReceived.module.css';
import backIcon from './../../../icons/back-icon.svg';
import Button from '../../ui/atoms/Button/Button';
import { UserContext } from "../../context";
import Img from './../../ui/atoms/Img/Img';
import { Link, useParams } from 'react-router-dom';
import P from './../../ui/atoms/P/P';
import { useContext} from "react";
import { useEffect, useState } from 'react';

const SingleConnectionReceived = () => 
{
    const {connectionsReceived} = useContext(UserContext);
    const {id: connection_id} = useParams();
    const [connectionData, setConnectionData] = useState(null);


    const getConnection = () => 
    {
        let connection_data;

        Object.values(connectionsReceived).every((connection_type) =>
        {
            if(connection_type.length > 0)
            {
                connection_type.every((single_connection) => 
                {
                    if(single_connection.id == connection_id)
                    {
                        connection_data = single_connection;
                        return false;
                    }else
                    {
                        return true;
                    }
                });

                return false;
            }else 
            {
                return true;
            }

        });       

        return connection_data;
    }

    useEffect(() => 
    {
        setConnectionData(getConnection());
        console.log(connectionData);
    }, [connection_id]);

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
                        <Button>Reject Request</Button>
                    </div>
                    <div className={styles.acceptButton}>
                        <Button>Accept Request</Button>
                    </div>
                </div>

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleConnectionReceived;