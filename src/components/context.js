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
    connectionsReceived : {},
    setConnectionsReceived : () => {}
});


export const UserContextProvider = ({children}) => 
{
    const {isSuccess, isError, APIData, sendPostRequest} = usePost(REFRESH_TOKEN);

    const [onFirstLoad, setOnFirstLoad] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("isUserLoggedIn"));
    const [isProfileCreated, setIsProfileCreated] = useState();
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile_data")));

    const [connectionsReceived, setConnectionsReceived] = useState({});
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

        const timeForTokenToExpire = 13 * 60 * 1000; 

        if(onFirstLoad || isUserLoggedIn)
        {
            let timer = setInterval(() => 
            {
                refreshToken()
            }, timeForTokenToExpire)

            return () => clearInterval(timer);
        }   
        
        if(isSuccess)
        {
            console.log("Success refresh token");
            console.log(APIData);
            localStorage.setItem("isUserLoggedIn", true);
            localStorage.setItem("accessToken", APIData.access);
            localStorage.setItem("refreshToken", APIData.refresh);
        }

        if(isError)
        {
            console.log("Error refresh token")
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }        

    }, [isUserLoggedIn, onFirstLoad, isSuccess, isError, APIData, userProfile])

    return (   
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
     );
}
 