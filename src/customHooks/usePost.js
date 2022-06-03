import { useCallback, useState } from "react";

const usePost = (url, headersValue = {}) => 
{
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [APIdata, setAPIData] = useState({});

  const fetchFunction = async(formData) =>
  {
    
    try 
    {
      const res = await fetch(url, {
        method: "POST",
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
    
  const sendPostRequest = useCallback((formData) => 
  {
    fetchFunction(formData);    
  },
    [fetchFunction]
  );


  return { isError, isSuccess, APIdata, sendPostRequest };
};

export default usePost;
