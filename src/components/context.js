import { useState } from "react";
import { createContext } from "react";

// Function to check if user is logged in based on their time their token is meant to expire
const checkIfUserIsLoggedIn = () =>
{
    return localStorage.getItem("isUserLoggedIn") ? localStorage.getItem("isUserLoggedIn") : false;
}

export const UserContext = createContext({
    isUserLoggedIn: checkIfUserIsLoggedIn(),
    setIsUserLoggedIn: () => {},
    isProfileCreated: false,
    setIsProfileCreated: () => {} ,
    userProfile: {"Hi": "me"},
    setUserProfile : () => {}
});


export const UserContextProvider = ({children}) => 
{
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isProfileCreated, setIsProfileCreated] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const UserContextValue = 
    {
        isUserLoggedIn: isUserLoggedIn,
        setIsUserLoggedIn: (value) => setIsUserLoggedIn(value),
        isProfileCreated: isProfileCreated,
        setIsProfileCreated: (value) => setIsProfileCreated(value),
        userProfile: userProfile,
        setUserProfile: (profile) => setUserProfile(profile)
    }

    return (   
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
     );
}
 