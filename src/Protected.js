import { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import SignInDialog from "./components/ui/organisms/Auth/SignIn/SignInDialog";
import CreateAccountDialog from "./components/ui/organisms/Auth/CreateAccount/CreateAccountDialog";
import { useEffect } from "react";
import CreateProfileDialog from "./components/ui/organisms/Auth/CreateProfileDialog/CreateProfileDialog";

const Protected = ({children, checkProfile}) => 
{
    let location = useLocation();

    // For sign in modal
     const [signInModalState, setSignInModalState] = useState(false);
     const showSignInDialog = () => setSignInModalState(true);
     const closeSignInModal = () => setSignInModalState(false);
 
     // //For create account modal
     const [createAccountModalState, setCreateAccountModalState] = useState(false);
     const showCreateAccountDialog = () => setCreateAccountModalState(true);
     const closeCreateAccountModal = () => setCreateAccountModalState(false);
 
    // For create account modal
    const [createProfileModalState, setCreateProfileModalState] = useState(false);
    const showCreateProfileDialog = () => setCreateProfileModalState(true);
    const closeCreateProfileModal = () => setCreateAccountModalState(false);
    
     const openSignInModal = () => 
     {
         closeCreateAccountModal();
         showSignInDialog();
     }
 
     const openCreateAccountModal = () => 
     {
         closeSignInModal();
         showCreateAccountDialog();
     }

     let profile_data = JSON.parse(localStorage.getItem("profile_data"));
     let isProfileValid = profile_data?.email && profile_data?.fullname && profile_data?.id;

     useEffect(() => 
     {
        if(!localStorage.getItem("isUserLoggedIn"))
        {
          
            openSignInModal();

        }

        if(localStorage.getItem && (checkProfile && !isProfileValid))
        {
            showCreateProfileDialog();
        }

     }, []);


        if(localStorage.getItem("isUserLoggedIn"))
        {
            if(checkProfile)
            {
                if(isProfileValid)
                {
                    return (children);

                } else 
                {
                    return (<CreateProfileDialog
                        open={createProfileModalState}
                        closeModal={closeCreateProfileModal}
                        message = "You need to create your profile before you can proceed" 
                    />);
                }
                
            }else 
            {
                return (children);
            }
        }else 
        {
            return (
                <>
                <SignInDialog 
                    open={signInModalState} 
                    closeModal={closeSignInModal}
                    openCreateAccountModal={openCreateAccountModal}
                    redirectTo = {location.pathname}
                    message = "You need to login before you can proceed" 
                />

                    <CreateAccountDialog 
                        open={createAccountModalState}
                        closeModal={closeCreateAccountModal}
                        openSignInModal={openSignInModal}
                        redirectTo = {location.pathname}
                        message = "You need to login before you can proceed" 
                    />
                </>
            );
            
        }

       }
 
export default Protected;