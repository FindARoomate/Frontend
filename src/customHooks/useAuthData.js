import { CREATE_ACCOUNT, LOGIN } from "../components/routes";
import { useMutation } from "react-query";
import axios from "axios";

const postLoginData = async (formData) => 
{
    const res = await axios.post(LOGIN, formData);
    return await res.data;
}


export const useLoginData = (config = {}) => 
{
    return useMutation(postLoginData, config);
}



const postCreateAccountData = async (formData) => 
{
    const res = await axios.post(CREATE_ACCOUNT, formData);
    return await res.data;
}

export const useCreateAccountData = (config = {}) => 
{
    return useMutation(postCreateAccountData, config);
}
 
