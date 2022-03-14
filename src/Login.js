import Header from "./Header";
import { useState, useEffect } from "react";
import closedEyeIcon from "./icons/closed-eye-icon.svg";
import DesktopAuthPrompt from "./DesktopAuthPrompt";
import MobileAuthPrompt from "./MobileAuthPrompt";
import ValidationError from "./classes/Errors/ValidationError";

const Login = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [revealPasswordDisplay, setRevealPasswordDisplay] = useState("block");
  const [concealPasswordDisplay, setConcealPasswordDisplay] = useState("none");
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailValue, setEmail] = useState(null);
  const [passwordValue, setPassword] = useState(null);

  const handleLogin = (e) => 
  {
    e.preventDefault();
    const loginCredentials = 
    {
      "email" : emailValue,
      "password": passwordValue
    }

    fetch('http://find-a-roomate.herokuapp.com/auth/login/', 
    {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      redirect: "follow",
      mode: "cors",
      headers: 
      {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })
    .then (async (res) => 
    {
        const body = await (res.json());

        if(!res.ok)
        {
          throw new ValidationError("Incorrect Credentials")
        }

        //show success message
        console.log(body);
    })
    .catch((error) => 
    {
      console.log(error.message);
    });

  }

  const handleEmailChange = (emailValue) => 
  {
    setEmail(emailValue);
  };

  const handlePasswordChange = (passwordValue) => 
  {
    setPassword(passwordValue);
  };

  const handleRevealPassword = () => 
  {
    setPasswordInputType("text");
    setRevealPasswordDisplay("none");
    setConcealPasswordDisplay("block");
  };

  const handleConcealPassword = () => 
  {
    setPasswordInputType("password");
    setRevealPasswordDisplay("block");
    setConcealPasswordDisplay("none");
  };

  useEffect(() => 
  {
    setIsDisabled(!(emailValue && passwordValue));
  });

  return (
    <>
      <Header />
      <div style={{ flexDirection: "row-reverse" }} className="auth">
        <DesktopAuthPrompt login />
        <div className="body auth-body login-body">
          <div style={{ margin: 0 }} className="auth-form-fields">
            <form onSubmit={(e) => handleLogin(e)}>
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
                    alt=""
                    src={closedEyeIcon}
                    onClick={handleRevealPassword}
                  />

                  {/* Conceal Password Eye Icon */}
                  <img
                    style={{
                      display: concealPasswordDisplay,
                    }}
                    alt=""
                    src={closedEyeIcon}
                    onClick={handleConcealPassword}
                  />
                </span>

                {/* <img src={openEyeIcon} class="concealPassword"/> */}
              </div>
              <button disabled={isDisabled} link="/sign-up">
                Login
              </button>
            </form>
            <a href="/#" className="italics blue forgot-password">
              Forgot password
            </a>

           <MobileAuthPrompt login />

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
