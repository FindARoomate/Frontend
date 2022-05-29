import ErrorAlert from "../../../molecules/Alerts/ErrorAlert/ErrorAlert";
import googleIcon from "../../../../../icons/google-icon.svg";
import usePost from "../../../../../customHooks/usePost";
import { Navigate } from "react-router-dom";
import Button from "../../../atoms/Button/Button";
import H3 from "../../../atoms/Headings/H3/H3";
import styles from "./SignInDialog.module.css";
import Input from "../../../atoms/Input/Input";
import Label from "../../../atoms/Label/Label";
import { LOGIN } from "../../../../routes";
import { useState, useEffect, memo } from "react";
import Img from "../../../atoms/Img/Img";
import Modal from "../../Modal/Modal";
import P from "../../../atoms/P/P";
import PasswordInput from "../../../atoms/Input/PasswordInput";
import { UserContext } from "../../../../context";
import { useContext } from "react";

const SignInDialog = ({ open, closeModal, openCreateAccountModal}) => 
{
  const [isLoading, setIsLoading] = useState(false);
  const { isSuccess, isError, APIdata, sendPostRequest } = usePost(LOGIN);

  const handleSignIn = (e) => 
  {
    e.preventDefault();
    setIsLoading(true);
    //trigger login request to backend
    const formData = new FormData();
    formData.append("email", e.target[0].value);
    formData.append("password", e.target[1].value)
    sendPostRequest(formData);
    
  };

  const handleCreateAccountOnClick = (e) => 
  {
    e.preventDefault();
    openCreateAccountModal();
  }

  //update context
  {
    const {isUserLoggedIn, setIsUserLoggedIn} = useContext(UserContext);

    const updateContext = () => 
    {
      console.log("Before: ", isUserLoggedIn);
      localStorage.setItem("isUserLoggedIn", true);
      setIsUserLoggedIn(true);
    }

    {isSuccess && updateContext()}

    console.log("After: ", isUserLoggedIn);

   }

  useEffect(() => 
  {
    //after getting a response from database, remove loading message
    if (isSuccess || isError) 
    {
      setIsLoading(false);
    }

    console.log(APIdata);

    if (isSuccess) 
    {
      localStorage.setItem("accessToken", APIdata.access); //add access token to localStorage
      localStorage.setItem("refreshToken", APIdata.refresh); //add refresh token to localStorage
    }

  }, [isError, isSuccess, APIdata]);

  return (
    <div className={styles.signInDialogContainer}>
      {/* Update react context */}
      {/* {isSuccess && 
       <UserContext.Consumer>
        {
          ({isUserLoggedIn, setIsUserLoggedIn}) => 
          {
            console.log("Before: ", isUserLoggedIn);
            localStorage.setItem("isUserLoggedIn", true);
            setIsUserLoggedIn(true);
            console.log("After: ", isUserLoggedIn);
          }
        }
      </UserContext.Consumer>
      } */}
      {/* move them to the on boarding screens on login */}
      {isSuccess &&  ((APIdata.data.last_login) ? <Navigate to="/dashboard"/> : <Navigate to="/create-profile-instruction" />)}

      <Modal open={open} closeModal={closeModal}>
        <div className={styles.signInDialog}>
          <div className={styles.heading}>
            <H3>SIGN IN</H3>
            <P>It's nice having you here again</P>
          </div>
          <div className={styles.form}>
            <form onSubmit={handleSignIn}>
              {isError && <ErrorAlert>{APIdata.detail}</ErrorAlert>}
              <div className={styles.inputGroup}>
                <Label>Email</Label>
                <Input type="text" placeholder="Enter your email address"/>
              </div>
              <div className={styles.inputGroup}>
                <Label>Password</Label>
                <PasswordInput placeholder="Enter your password" />
              </div>
              <Button className={isLoading ? "isLoading": ""}>{isLoading ? "Loading..." : "Sign In"}</Button>
              <div className={styles.divider}>
                <span>or</span>
              </div>
              <div className={styles.bottom}>
                <Button>
                  <Img src={googleIcon} />
                  <P>Continue with Google</P>
                </Button>
                <P>
                  Don't have an account? <span onClick={handleCreateAccountOnClick}>Sign up</span>
                </P>
              </div>
            </form>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default memo(SignInDialog);
