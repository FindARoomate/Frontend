const fetchData = async (url, token = null) => 
{
    var headersValue = 
    {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    } 

    if(token) headersValue["Authorization"] = "Bearer " + token;

    const res = await fetch(url);
    const body = await res.json();

    return body;
}

const useQueryGet = (uniqueId, data, config = {}) => 
{
    return useQuery(uniqueId, fetchData(data.url, data.token = null), config);
}
 
export default useQueryGet;