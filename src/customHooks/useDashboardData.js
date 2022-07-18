import { CONNECTION_SENT, DASHBOARD_STATISTICS, USER_INACTIVE_REQUESTS, USER_ACTIVE_REQUESTS, CONNECTION_RECEIVED,  GET_SINGLE_ROOMMATE_REQUEST } from "../components/routes";
// import { ACCESS_TOKEN } from "../components/settings";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

let ACCESS_TOKEN = "Bearer " + localStorage.getItem("accessToken");

const fetchDashboardStatisticsData = async () => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(DASHBOARD_STATISTICS, { headers: headersValue });
    return res.data;
}

export const useGetDashboardStatistics = (config) => 
{
    return useQuery("dashboard-statistics", fetchDashboardStatisticsData, config);
}

// Connection Sent
 
const fetchConnectionSentData = async () => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(CONNECTION_SENT, { headers: headersValue });
    return res.data;
}


export const useGetConnectionsSent = (config) => 
{
    return useQuery("connections-sent", fetchConnectionSentData, config);
}
 
// Connection Sent
 
const fetchConnectionReceivedData = async () => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(CONNECTION_RECEIVED, { headers: headersValue });
    return res.data;
}

export const useGetConnectionsReceived = (config) => 
{
    return useQuery("connections-received", fetchConnectionReceivedData, config);
}


// Inactive Request

const fetchInactiveRequestData = async () => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(USER_INACTIVE_REQUESTS, { headers: headersValue });
    return res.data;
}

export const useGetInactiveRequests = (config) => 
{
    return useQuery("inactive-requests", fetchInactiveRequestData, config);
}



// Active Request

const fetchActiveRequestData = async () => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(USER_ACTIVE_REQUESTS, { headers: headersValue });
    return res.data;
}

export const useGetActiveRequests = (config) => 
{
    return useQuery("active-requests", fetchActiveRequestData, config);
}


// Getting single roommate request 
// This is the roommate request on the dashboard
// For the single roommate roommate request people can see without logging in, 
// the function is in useRoommateRequestData hook. 

const fetchRequestData = async (data) => 
{
    var id = data.queryKey[1];
    var url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.get(url, { headers: headersValue });
    return res.data;
}

export const useGetSingleRoommateRequestData = (id, config = {}) => 
{
    const queryClient = useQueryClient();

    return useQuery(["roommate-request", id], fetchRequestData, 
    {
        initialData: () => 
        {
            // Check active requests
            const roommateRequestsInActiveRequests = queryClient
            .getQueryData("active-requests")
            ?.find((request) => request.id === parseInt(id));

            // Check inactive requests
            const roommateRequestsInInactiveRequests = queryClient
            .getQueryData("inactive-requests")
            ?.find((request) => request.id === parseInt(id));
            
            if(roommateRequestsInActiveRequests)
            {
                return roommateRequestsInActiveRequests;

            }else if(roommateRequestsInInactiveRequests)
            {
                return roommateRequestsInActiveRequests;

            }else 
            {
                return undefined;
            }

        },
        ...config
    });
}