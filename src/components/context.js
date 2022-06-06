import { REFRESH_TOKEN } from "./routes";
import usePost from "../customHooks/usePost";
import { useEffect, useState, createContext } from "react";



export const UserContext = createContext({
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    isProfileCreated: false,
    setIsProfileCreated: () => {} ,
    userProfile: {"Hi": "me"},
    setUserProfile : () => {},
    connectionsSent : {},
    setConnectionsSent : () => {},
    connectionsReceived : {},
    setConnectionsReceived : () => {}
});


export const UserContextProvider = ({children}) => 
{
    const {isSuccess, isError, APIData, sendPostRequest} = usePost(REFRESH_TOKEN);

    const [onFirstLoad, setOnFirstLoad] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("isUserLoggedIn"));
    const [isProfileCreated, setIsProfileCreated] = useState();
    const [userProfile, setUserProfile] = useState({
        "fullname": localStorage.getItem("fullname"),
        "image_url": localStorage.getItem("image_url"),
        "profile_id": localStorage.getItem("id"),
        "user_id": localStorage.getItem("user_id")
      });

    const [connectionsReceived, setConnectionsReceived] = useState({});
    const [connectionsSent, setConnectionsSent] = useState({});

    const UserContextValue = 
    {
        isUserLoggedIn: localStorage.getItem("isUserLoggedIn") ? localStorage.getItem("isUserLoggedIn") : false,
        setIsUserLoggedIn: (value) => setIsUserLoggedIn(value),
        isProfileCreated: isProfileCreated,
        setIsProfileCreated: (value) => setIsProfileCreated(value),
        userProfile: userProfile,
        setUserProfile: (profile) => setUserProfile(profile),
        connectionsSent: connectionsSent,
        setConnectionsSent: (data) => setConnectionsSent(data),
        connectionsReceived: connectionsReceived,
        setConnectionsReceived: (data) => setConnectionsReceived(data),

    }

    const refreshToken = () =>
    {
        console.log("Refresh Token");
        let formData = new FormData();
        formData.append("refresh", localStorage.getItem("refreshToken"))
        sendPostRequest(formData);

        if(isSuccess && APIData !=null)
        {
            console.log("Success refresh token");
            localStorage.setItem("isUserLoggedIn", true);
            localStorage.setItem("accessToken", APIData.access);
            localStorage.setItem("refreshToken", APIData.refresh);
        }

        if(isError && APIData !=null)
        {
            console.log("Error refresh token")
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }

        setOnFirstLoad(false);
    }   

    useEffect(() => 
    {
        const timeForTokenToExpire = 15 * 60 * 1000; 

        if(onFirstLoad || isUserLoggedIn)
        {
            let timer = setInterval(() => 
            {
                refreshToken()
            }, timeForTokenToExpire)

            return () => clearInterval(timer);
        }   
        
    }, [isUserLoggedIn, onFirstLoad])

    return (   
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
     );
}
 