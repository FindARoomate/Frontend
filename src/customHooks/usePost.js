import { useCallback, useState } from "react";

const usePost = (url, token) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [APIdata, setAPIData] = useState({});

  var headersValue = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // add token to the header if it exists
  if (token) headersValue["Authorization"] = "Bearer " + token;

  const sendPostRequest = useCallback((credentials) => {
      
    fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        redirect: "follow",
        mode: "cors",
        headers: headersValue,
      })
        .then((res) =>  
        {
          const body = res.json();
          
          return body;

          // console.log(res);
          // throw body;
        })
        .then((data) => 
        {
          console.log(data);
          setAPIData(data);
          setIsSuccess(true);
          setIsError(false);
        })
        .catch((error) => 
        {
          setIsSuccess(false);
          setIsError(true); //Remove any success message
          setAPIData(error.message);
          console.log(error);
        });
    },
    [url, headersValue]
  );

  return { isError, isSuccess, APIdata, sendPostRequest };
};

export default usePost;
