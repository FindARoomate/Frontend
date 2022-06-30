import { REFRESH_TOKEN } from "./routes";
import usePost from "../customHooks/usePost";
import { useEffect, useState, createContext } from "react";



export const UserContext = createContext({
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    isProfileCreated: false,
    setIsProfileCreated: () => {} ,
    userProfile: {},
    setUserProfile : () => {},
    connectionsSent : {},
    setConnectionsSent : () => {},
    connectionsReceived : [],
    setConnectionsReceived : () => {}
});


export const UserContextProvider = ({children}) => 
{
    const {isSuccess, isError, APIdata, sendPostRequest} = usePost(REFRESH_TOKEN);

    const [onFirstLoad, setOnFirstLoad] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("isUserLoggedIn"));
    const [isProfileCreated, setIsProfileCreated] = useState();
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile_data")));

    const [connectionsReceived, setConnectionsReceived] = useState([]);
    const [connectionsSent, setConnectionsSent] = useState({});

    const UserContextValue = 
    {
        isUserLoggedIn: localStorage.getItem("isUserLoggedIn"),
        setIsUserLoggedIn: (value) => setIsUserLoggedIn(value),
        isProfileCreated: isProfileCreated,
        setIsProfileCreated: (value) => setIsProfileCreated(value),
        userProfile: userProfile,
        setUserProfile: (profile) => 
        {
            setUserProfile(profile);
            localStorage.setItem("profile_data", JSON.stringify(profile));
        },
        connectionsSent: connectionsSent,
        setConnectionsSent: (data) => setConnectionsSent(data),
        connectionsReceived: connectionsReceived,
        setConnectionsReceived: (data) => setConnectionsReceived(data),

    }

    const refreshToken = () =>
    {
        let formData = new FormData();
        formData.append("refresh", localStorage.getItem("refreshToken"))
        sendPostRequest(formData);
        setOnFirstLoad(false);
    }   

    useEffect(() => 
    {

        console.log(onFirstLoad);

        const timeForTokenToExpire = 30 * 1000; 
        let timer;

        if(onFirstLoad && isUserLoggedIn)
        {
            refreshToken();
        }

        if(!onFirstLoad && isUserLoggedIn)
        {
            timer = setInterval(() => 
            {
                refreshToken();
            }, timeForTokenToExpire);
        } 

        if(isSuccess)
        {
            console.log("Success refresh token");
            localStorage.setItem("isUserLoggedIn", true);
            localStorage.setItem("accessToken", APIdata.access);
            localStorage.setItem("refreshToken", APIdata.refresh);
        }

        if(isError)
        {
            console.log("Error refresh token")
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("profile_data");
        }    

        return () => clearInterval(timer);

    }, [isUserLoggedIn, onFirstLoad, isSuccess, isError, APIdata, userProfile])

    return (   
        <UserContext.Provider value={UserContextValue}>
            {(onFirstLoad && isUserLoggedIn) ? "Loading..." : children}
        </UserContext.Provider>
     );
}
 