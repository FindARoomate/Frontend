import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './InactiveRequests.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";
import useGet from "../../../customHooks/useGet";
import { USER_INACTIVE_REQUESTS } from "../../routes";
import {v4 as uuidv4} from 'uuid';
import P from "../../ui/atoms/P/P";
import { Link } from "react-router-dom";
import { useGetInactiveRequests } from "../../../customHooks/useDashboardData";

const InactiveRequests = () => 
{

    const { isLoading, isSuccess, isError, data: APIData } = useGetInactiveRequests();
    console.log(APIData);
    

    
    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Inactive Requests</H2>    

                <div className={styles.listBoxContainer}>
                {isLoading &&  <div>Loading...</div>}
                {(APIData?.length == 0) ?
                        <P className={styles.noRequestMessage}>You have no inactive requests at this moment. <Link to="/create-roommate-request-instruction">Request for a roommate now</Link></P> 
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
                    }
                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default InactiveRequests;