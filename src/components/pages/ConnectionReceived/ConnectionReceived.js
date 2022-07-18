import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import styles from './ConnectionReceived.module.css';
import dp from "../../../images/dashboard-image.png";
import H2 from "../../ui/atoms/Headings/H2/H2";
import { useState, useEffect, useContext} from "react";
import P from "../../ui/atoms/P/P";
import {v4 as uuidv4} from "uuid";
import { UserContext } from "../../context";
import { useGetConnectionsReceived } from "../../../customHooks/useDashboardData";


const ConnectionReceived = () => 
{
    const [data, setData] = useState([]);
    const [connectionRequestError, setConnectionRequestError] = useState(null);
    const { isLoading, isError, isSuccess, data:APIData } = useGetConnectionsReceived();

    const { setConnectionsReceived } = useContext(UserContext);

    useEffect(() => 
    {
        if(isSuccess)
        {
            setConnectionsReceived(APIData);//save data to context

            if(APIData && APIData.accepted_requests.length > 0) 
            {
                setConnectionRequestError(null);
                setData(APIData.accepted_requests);
            }
            else
            {
                setConnectionRequestError("You have not accepted any connection request at the moment");
            }
        }
    }, [APIData]);

    const showRequests = (requestType) => 
    {
        const tabs = document.querySelectorAll(`.${styles.tab}`);
        const acceptedTab = tabs[0];
        const pendingTab = tabs[1]
        const rejectedTab = tabs[2]

        if(APIData)
        {
            setConnectionRequestError(null);
            if(requestType == "accepted_requests")
            {
                // Make accepted request active
                acceptedTab.classList.add(styles.activeTab);
                pendingTab.classList.remove(styles.activeTab);
                rejectedTab.classList.remove(styles.activeTab);
                
                (APIData.accepted_requests.length > 0) ? 
                setData(APIData.accepted_requests) : 
                setConnectionRequestError("You have not accepted any connection request at the moment");
            } 

            if(requestType == "pending_requests")
            {
                // Make pending request active
                acceptedTab.classList.remove(styles.activeTab);
                pendingTab.classList.add(styles.activeTab);
                rejectedTab.classList.remove(styles.activeTab);
                
                (APIData.pending_requests.length > 0) ? 
                setData(APIData.pending_requests) : 
                setConnectionRequestError("You have no pending connection request at the moment");
            }

            if(requestType == "rejected_requests")
            {
                // Make rejected request active
                acceptedTab.classList.remove(styles.activeTab);
                pendingTab.classList.remove(styles.activeTab);
                rejectedTab.classList.add(styles.activeTab);
                
                (APIData.rejected_request.length > 0) ? 
                setData(APIData.rejected_request) : 
                setConnectionRequestError("You have not declined any connection request at the moment");
            } 
        }
        

    }



    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Connection Received</H2>    
                <div className={styles.tabs}>
                    <div onClick={() => showRequests("accepted_requests")} className={`${styles.tab} ${styles.activeTab}`}>Accepted</div>
                    <div onClick={() => showRequests("pending_requests")} className={styles.tab}>Pending</div>
                    <div onClick={() => showRequests("rejected_requests")} className={styles.tab}>Declined</div>
                </div>
                <div className={styles.listBoxContainer}>
                    {!APIData && <P>Loading...</P>}
                    {connectionRequestError && <P>{connectionRequestError}</P>}
                    {!connectionRequestError && data.map((datum) => 
                    {
                        return (<ListBox
                            key = {uuidv4()}
                            link = {"/connection-received/"+datum.id}
                            name = {datum.sender_data[0].fullname}
                            description = {datum.roomate_request.listing_title}
                            tag={datum.status}
                            dp={datum.roomate_request.request_images[0].image_url}
                        />)
                    }) }
                    
                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default ConnectionReceived;