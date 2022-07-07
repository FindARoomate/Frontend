import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './ActiveRequests.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";
import {v4 as uuidv4} from 'uuid';
import P from "../../ui/atoms/P/P";
import { Link } from "react-router-dom";
import { useGetActiveRequests } from "../../../customHooks/useDashboardData";

const ActiveRequests = () => 
{
    const {isLoading, error, data: APIData } = useGetActiveRequests();

    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Active Requests</H2>    

                <div className={styles.listBoxContainer}>
                {isLoading && "Loading..."}
                {APIData && 
                    (
                        (APIData.length === 0) ?
                            <P className={styles.noRequestMessage}>You have no active requests at this moment. <Link to="/create-roommate-request-instruction">Request for a roommate now</Link></P> 
                        :
                        APIData?.map((request) => 
                        {
                        return ( <ListBox
                            key = {uuidv4()}
                            link = {`/request/${request.id}`}
                            name = {request.listing_title}
                            description = {request.additional_information}
                            // dp={dp}
                        />);

                        })
                    )}

                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default ActiveRequests;