import axios from "axios";
import { useMutation } from "react-query";
import { CANCEL_CONNECTION_END, CANCEL_CONNECTION_START, CREATE_CONNECTION_REQUEST } from "../components/routes";

let ACCESS_TOKEN = "Bearer " + localStorage.getItem("accessToken");

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

// Creating a new request
const cancelConnectionRequestData = async (id) => 
{
    const cancel_connection_url = CANCEL_CONNECTION_START + id + CANCEL_CONNECTION_END;

    var headersValue = 
    {
        "Accept" : "application/json",
        "Authorization": ACCESS_TOKEN
    } 
    const res = await axios.delete(cancel_connection_url, { headers: headersValue });
    return res.data;
}

export const useCancelConnectionRequestData = (id, config = {}) => 
{
    return useMutation(() => cancelConnectionRequestData(id), config)
}
