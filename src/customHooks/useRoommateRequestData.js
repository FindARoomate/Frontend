import { ADD_IMAGES_TO_ROOMMATE_REQUEST, CREATE_ROOMMATE_REQUEST } from "../components/routes";
import { ACCESS_TOKEN } from "../components/settings";
import { useMutation } from "react-query";
import axios from "axios";

const postData = async (formData) => 
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
    return useMutation(postData, config);
}
 

const createRequestData = async (formData) => 
{
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