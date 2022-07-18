import { 
            ADD_IMAGES_TO_ROOMMATE_REQUEST, 
            CREATE_ROOMMATE_REQUEST, 
            GET_SINGLE_ROOMMATE_REQUEST,
            GET_ALL_ROOMMATE_REQUESTS,
            CREATE_CONNECTION_REQUEST
        } from "../components/routes";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";


let ACCESS_TOKEN = "Bearer " + localStorage.getItem("accessToken");

// Add Image to roommate request 
// Mainly used for updating existing requests
const addImageToRoommateRequest = async (formData) => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.post(ADD_IMAGES_TO_ROOMMATE_REQUEST, formData, { headers: headersValue });
    return res.data;
}


export const useAddImagesToRoommateRequestData = (config = {}) => 
{
    return useMutation(addImageToRoommateRequest, config);
}
 

// Creating a new request
const createRequestData = async (formData) => 
{
    // console.log("Creating data...");
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.post(CREATE_ROOMMATE_REQUEST, formData, { headers: headersValue });
    return res.data;
}

export const useCreateRoommateRequestData = (config = {}) => 
{
    return useMutation(createRequestData, config)
}



// To get all roommate requests in view all request page
const fetchAllRequestData = async (data) => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
    } 
    const res = await axios.get(GET_ALL_ROOMMATE_REQUESTS, { headers: headersValue });
    return res.data;
}

export const useViewAllRoommateRequestData = (config = {}) => 
{
    return useQuery("view-all-roommate-requests", fetchAllRequestData, config);
}


// Getting single roommate request 
// This is the roommate roommate request people can see without logging in
// For the dashboard single roommate request, 
// the function is in useDashboardData hook. 

const fetchSingleRequestData = async (data) => 
{
    var id = data.queryKey[1];
    var url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    var headersValue = 
    {
        "Accept" : "application/json",
    } 
    const res = await axios.get(url, { headers: headersValue });
    // console.log(res.data);
    return res.data;
}

export const useViewSingleRoommateRequestData = (id, config = {}) => 
{
    const queryClient = useQueryClient();

    return useQuery(["view-single-roommate-request", id], fetchSingleRequestData, 
    {
        initialData: () => 
        {
            // Check active requests
            const singleRequest = queryClient
            .getQueryData("view-all-roommate-requests")
            ?.results?.find((request) => request.id === parseInt(id));
            
            if(singleRequest)
            {
                // console.log(singleRequest);
                return singleRequest;

            }else 
            {
                return undefined;
            }

        },
        ...config
    }
    );
}


// Creating a new request
const sendConnectionRequestData = async (formData) => 
{
    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.post(CREATE_CONNECTION_REQUEST, formData, { headers: headersValue });
    return res.data;
}

export const useSendConnectionRequestData = (config = {}) => 
{
    return useMutation(sendConnectionRequestData, config)
}
