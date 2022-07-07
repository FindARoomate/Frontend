import { CONNECTION_SENT, DASHBOARD_STATISTICS, USER_INACTIVE_REQUESTS, USER_ACTIVE_REQUESTS } from "../components/routes";
import { ACCESS_TOKEN } from "../components/settings";
import { useQuery } from "react-query";
import axios from "axios";

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