import { useCallback, useState } from "react";

const usePost = (url, token) => 
{
    // const [successMessage, setSuccessMessage] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [errorMessage, setError] = useState(null);
    const [data, setData] = useState({});


    var headersValue = 
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }

    // add token to the header if it exists
    if(token) headersValue["Authorization"] = "Bearer " + token;
    
    const sendPostRequest = useCallback((credentials)=> {
      fetch(url, 
        {
          method: "POST",
          body: JSON.stringify(credentials),
          redirect: "follow",
          mode: "cors",
          headers: headersValue
        })
        .then (async (res) => 
        {
            const body = await (res.json());
    
            if(!res.ok)
            {
              // console.log(body);
              throw body;
            }
    
            setIsError(false);
            setIsSuccess(true);
            setData(body);
        })
        .catch((error) => 
        {
            //log error
            // console.log(error);
    
            setIsSuccess(false)
            setIsError(true); //Remove any success message
            setData(error);
        });
    }, [url, token]);
     
    return {data, isError, isSuccess, sendPostRequest}
}
 
export default usePost;