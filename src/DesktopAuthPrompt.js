import React from "react";
import { Link } from "react-router-dom";
import googleIcon from "./icons/google-icon.svg";
import loginImage from "./images/login-image.svg";
import signUpImage from "./images/sign-up-image.svg";

const DesktopAuthPrompt = (props) => {
  return (
    <div className="auth-headers">
      <h1>{props.login ? "LOGIN" : "SIGN UP"}</h1>
      <p style={{padding: '0px 20px'}} className="gray">
        {props.login
          ? "Welcome Back"
          : "Create an account to be able to create a roommate request"}
      </p>
      <img src={props.login ? loginImage : signUpImage} alt="Login" />
      <div className="desktop-only-additionals additionals">
        <span className="divider">
          {" "}
          <span>or</span>{" "}
        </span>
        <span className="alternative-login">
          Continue with <img alt="" src={googleIcon} />
        </span>
        {props.login ? (
          <span>
            Create new account?{" "}
            <Link to="/sign-up">
              <span className="auth-link">Sign up</span>
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <Link to="/login">
              <span className="auth-link">Login</span>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default DesktopAuthPrompt;
