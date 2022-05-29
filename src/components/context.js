import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    isProfileCreated: false,
    setIsProfileCreated: () => {} ,
    userProfile: {},
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
 