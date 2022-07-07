import { useMutation } from "react-query";
import axios from "axios"
const postData = async ({url, token = null, formData}) => 
{

    const config = (token) ? {"Authorization": token} : {} 

    const res = await axios.post(url, formData, config);
    return await res.data;
}

const useQueryPost =  (data, config = {}) => 
{
    return useMutation(postData(data.url, data.token, data.formData), config);
}
 
export default useQueryPost;