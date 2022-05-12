import { useCallback, useState } from "react";

const usePost = (url, token) => 
{
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [APIdata, setAPIData] = useState({});

  var headersValue = 
  {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  // add token to the header if it exists
  if (token) headersValue["Authorization"] = "Bearer " + token;

  const fetchFunction = async(credentials) =>
  {

    try 
    {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        redirect: "follow",
        mode: "cors",
        headers: headersValue,
      });

      const data = await res.json();

      if(!res.ok)
      {
        throw data;

      }else
      {
        setAPIData(data);
        setIsSuccess(true);
        setIsError(false);
        console.log(data)
      }

    }catch(error)
    {
      setAPIData(error);
      setIsSuccess(false);
      setIsError(true); //Remove any success message
      console.log(error);
    }
  }
    
  const sendPostRequest = useCallback((credentials) => 
  {
    fetchFunction(credentials);    
  },
    [url, headersValue]
  );

  return { isError, isSuccess, APIdata, sendPostRequest };
};

export default usePost;
