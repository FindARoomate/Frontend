import { useCallback, useState } from "react";

const usePatch = (headersValue = {}) => 
{
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [APIData, setAPIData] = useState({});

  const fetchFunction = async(url, formData = {}) =>
  {
    
    try 
    {
      const res = await fetch(url, {
        method: "PATCH",
        body: formData,
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
        // console.log(data);
      }

    }catch(error)
    {
      setAPIData(error);
      setIsSuccess(false);
      setIsError(true); //Remove any success message
      // console.log(error);
    }
  }
    
  const sendPatchRequest = useCallback((url, formData) => 
  {
    fetchFunction(url, formData);    
  },
    [headersValue]
  );

  return { isError, isSuccess, APIData, sendPatchRequest };
};

export default usePatch;
