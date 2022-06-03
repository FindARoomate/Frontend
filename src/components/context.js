import { useState } from "react";
import { createContext } from "react";



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

    // Function to check if user is logged in based on their time their token is meant to expire
    const checkIfUserIsLoggedIn = () =>
    {
        return localStorage.getItem("isUserLoggedIn") ? localStorage.getItem("isUserLoggedIn") : false;
    }

    const UserContextValue = 
    {
        isUserLoggedIn: isUserLoggedIn,
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

    return (   
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
     );
}
 