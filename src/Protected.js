import { useState } from "react";
import { Route, useLocation } from "react-router-dom";
import SignInDialog from "./components/ui/organisms/Auth/SignIn/SignInDialog";
import CreateAccountDialog from "./components/ui/organisms/Auth/CreateAccount/CreateAccountDialog";
import { useEffect } from "react";

const Protected = ({children}) => 
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

     useEffect(() => 
     {
        if(!localStorage.getItem("isUserLoggedIn"))
        {
            openSignInModal();
        }
     }, []);

    
        if(localStorage.getItem("isUserLoggedIn"))
        {
            return (children);
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