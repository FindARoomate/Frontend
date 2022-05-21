import DashboardTemplate from "../../templates/DashboardTemplate/DashboardTemplate";
import styles from './ActiveRequests.module.css';
import H2 from "../../ui/atoms/Headings/H2/H2";
import ListBox from "../../ui/molecules/ListBox/ListBox";
import dp from "../../../images/dashboard-image.png";
import { USER_ACTIVE_REQUESTS } from "../../routes";
import useGet from "../../../customHooks/useGet";
import {v4 as uuidv4} from 'uuid';
import P from "../../ui/atoms/P/P";

const ActiveRequests = () => 
{
    const token = localStorage.getItem("accessToken");
    const {isSuccess, isError, APIData} = useGet(USER_ACTIVE_REQUESTS, token);

    return ( 
        <DashboardTemplate>
            <div className={styles.content}>
                <H2>Active Requests</H2>    

                <div className={styles.listBoxContainer}>
                {!APIData && "Loading..."}
                {APIData && 
                    (
                        (APIData.length == 0) ?
                            <P>You have no active requests at this moment</P> 
                        :
                        APIData.map((request) => 
                        {
                        return ( <ListBox
                            key = {uuidv4()}
                            link = {`/active-request/${request.id}`}
                            name = {request.listing_title}
                            description = {request.additional_information}
                            dp={dp}
                        />);

                        })
                    )}

                </div>
               
            </div>
        </DashboardTemplate>
     );
}
 
export default ActiveRequests;