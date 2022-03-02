import Header from "./Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import googleIcon from "./icons/google-icon.svg";
import closedEyeIcon from "./icons/closed-eye-icon.svg";
import openedEyeIcon from "./icons/opened-eye-icon.svg";
import AuthPrompt from "./AuthPrompt";

const SignUp = () => {
  const [nameValue, setName] = useState(null);
  const [phoneNumberValue, setPhoneNumber] = useState(null);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [revealPasswordDisplay, setRevealPasswordDisplay] = useState("block");
  const [concealPasswordDisplay, setConcealPasswordDisplay] = useState("none");
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailValue, setEmail] = useState(null);
  const [passwordValue, setPassword] = useState(null);

  const handlePhoneNumberChange = (phoneNumberValue) => {
    setPhoneNumber(phoneNumberValue);
  };

  const handleNameChange = (nameValue) => {
    setName(nameValue);
  };

  const handleEmailChange = (emailValue) => {
    setEmail(emailValue);
  };

  const handlePasswordChange = (passwordValue) => {
    setPassword(passwordValue);
  };

  const handleRevealPassword = () => {
    setPasswordInputType("text");
    setRevealPasswordDisplay("none");
    setConcealPasswordDisplay("block");
  };

  const handleConcealPassword = () => {
    setPasswordInputType("password");
    setRevealPasswordDisplay("block");
    setConcealPasswordDisplay("none");
  };

  useEffect(() => {
    setIsDisabled(
      !(emailValue && passwordValue && nameValue && phoneNumberValue)
    );
  });

  return (
    <>
      <Header />
      <div className="auth">
        <AuthPrompt signup />
        <div className="auth-body body">
          <div className="auth-form-fields">
            <form action="#">
              <div>
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  name="phone_number"
                  type="text"
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <span className="passwordInput">
                  <input
                    name="password"
                    type={passwordInputType}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  {/* Display Password Eye Icon */}
                  <img
                    style={{
                      display: revealPasswordDisplay,
                    }}
                    src={closedEyeIcon}
                    onClick={handleRevealPassword}
                  />

                  {/* Conceal Password Eye Icon */}
                  <img
                    style={{
                      display: concealPasswordDisplay,
                    }}
                    src={openedEyeIcon}
                    onClick={handleConcealPassword}
                  />
                </span>
              </div>
              <button disabled={isDisabled} link="/sign-up">
                Next
              </button>
            </form>

            <div className="mobile-only-additionals additionals">
              <span className="divider">
                {" "}
                <span>or</span>{" "}
              </span>
              <span className="alternative-login">
                Continue with <img src={googleIcon} />
              </span>
              <span>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="auth-link">Login</span>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
