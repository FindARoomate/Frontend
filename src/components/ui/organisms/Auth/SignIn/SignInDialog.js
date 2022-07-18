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
import { Formik } from 'formik';
import { signInInitialValues, signInValidation } from "./SignInHelper";
import { useLoginData } from "../../../../../customHooks/useAuthData";




const SignInDialog = ({open, closeModal, openCreateAccountModal, redirectTo = null, message = null}) => 
{
  
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const { setUserProfile, setIsUserLoggedIn } = useContext(UserContext);
  const { isLoading, error, data: APIdata, mutate } = useLoginData();

  if(error) console.log(error);

  const updateContext = (user_id, data, email) => 
  {
    let profile_data = {...data, email:email};

    localStorage.setItem("user_id", user_id);
    localStorage.setItem("isUserLoggedIn", true);
    localStorage.setItem("profile_data", JSON.stringify(profile_data));

    setIsUserLoggedIn(true);
    setUserProfile(profile_data);
  }

  const handleSignIn = (e, formik) => 
  {
    e.preventDefault();
    setSignInButtonClicked(true);

    if(Object.values(formik.errors).length <= 0)
    {
      //trigger login request to backend
      const formData = new FormData();
      formData.append("email", e.target[0].value.toLowerCase());
      formData.append("password", e.target[1].value)
      mutate(formData);
    }

  };

  const handleCreateAccountOnClick = (e) => 
  {
    e.preventDefault();
    openCreateAccountModal();
  }


useEffect(() => 
{
  if(APIdata) 
  {
    console.log(APIdata);
    // Close Modal if you are trying to redirect to the same page
    if(redirectTo == window.location.pathname)
    {
      closeModal();
    }


    updateContext(APIdata.data.id, APIdata.data.profile_data, APIdata.data.email);
    localStorage.setItem("accessToken", APIdata.access); //add access token to localStorage
    localStorage.setItem("refreshToken", APIdata.refresh); //add refresh token to localStorage

  }

}, [APIdata]);

  return (
    <div className={styles.signInDialogContainer}>      
        {
          APIdata && (APIdata.data.last_login ?
            (!redirectTo ? <Navigate to="/dashboard"/> : redirectTo !== window.location.path && redirectTo) : 
          <Navigate to="/create-profile-instruction" />)
        }

      <Modal open={open} closeModal={closeModal}>
        <div className={styles.signInDialog}>
          {message && <ErrorAlert>{message}</ErrorAlert>}
          <div className={styles.heading}>
            <H3>SIGN IN</H3>
            <P>It's nice having you here again</P>
          </div>
          <div className={styles.form}>
          <Formik
            initialValues = {signInInitialValues}
            validationSchema = {signInValidation}
            onSubmit = {handleSignIn}
          >
           {formik => (
            <form onSubmit={(e) => handleSignIn(e, formik)}>
              {error && <ErrorAlert>{error.response.data.detail}</ErrorAlert>}
              <div className={styles.inputGroup}>
                <Label>Email</Label>
                <Input {...formik.getFieldProps('email')} name="email" required placeholder="Enter your email address"/>
                {signInButtonClicked && (formik.errors.email && <ErrorAlert>{formik.errors.email}</ErrorAlert>)}

              </div>
              <div className={styles.inputGroup}>
                <Label>Password</Label>
                <PasswordInput {...formik.getFieldProps('password')} required name="password" placeholder="Enter your password" />
                {signInButtonClicked && (formik.errors.password && <ErrorAlert>{formik.errors.password}</ErrorAlert>)}
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
           )}
           </Formik>
          </div>
        </div>
      </Modal>

    </div>
  );

};

export default memo(SignInDialog);
