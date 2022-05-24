import { useEffect, useState } from "react";

const useGet = (url, token = null) => 
{
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [APIData, setAPIData] = useState(null);

    var headersValue = 
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    } 

    if(token) headersValue["Authorization"] = "Bearer " + token;

    const fetchFunction = async (url, headersValue) => 
    {
        const res = await fetch(url, {headers: headersValue });
        const body = await res.json();
        if(res.ok)
        {
            setIsError(false);
            setIsSuccess(true);
            setAPIData(body);
        }else
        {
            setIsError(true)
            setIsSuccess(false);
            setAPIData(body); 
            
        }

    }

    useEffect(() => 
    {
        fetchFunction(url, headersValue);

    }, [url, token])

    return {isError, isSuccess, APIData}
}
 
export default useGet;