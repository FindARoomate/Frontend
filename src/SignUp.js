import Header from "./Header";
import { useState, useEffect } from "react";
import closedEyeIcon from "./icons/closed-eye-icon.svg";
import openedEyeIcon from "./icons/opened-eye-icon.svg";
import DesktopAuthPrompt from "./DesktopAuthPrompt";
import MobileAuthPrompt from "./MobileAuthPrompt";
import ValidationError from "./classes/Errors/ValidationError";
import ErrorComponent from "./Error";
import SuccessComponent from "./Success";

const SignUp = () => {
  const [nameValue, setName] = useState(null);
  const [phoneNumberValue, setPhoneNumber] = useState(null);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [revealPasswordDisplay, setRevealPasswordDisplay] = useState("block");
  const [concealPasswordDisplay, setConcealPasswordDisplay] = useState("none");
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailValue, setEmail] = useState(null);
  const [passwordValue, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberChange = (phoneNumberValue) => 
  {
    setPhoneNumber(phoneNumberValue);
  };

  const handleNameChange = (nameValue) => 
  {
    setName(nameValue);
  };

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

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const formDetails = 
    {
      "username" : nameValue,
      "email": emailValue,
      "password": passwordValue
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    //Send request to database
    fetch('https://find-a-roomate.herokuapp.com/auth/register/', 
    {
      method: 'POST',
      body : JSON.stringify(formDetails),
      redirect: "follow",
      mode: "cors",
      headers: myHeaders
    })
    .then(async (res) => 
    {
      const body = await (res.json());

      if(!res.ok)
      {
        Object.values(body).forEach((error) => 
        {
          throw(new ValidationError(error));
        });
        
      }

      // Remove error message
      setError();
      // Show correct success message
      setSuccessMessage("Registration Successful. Kindly Login");
    })
    .catch((error) =>
    {
      //Remove any success message
      setSuccessMessage();
      //Show error message
      setError(error.message);
    })

  }

  useEffect(() => 
  {
    setIsDisabled(
      !(emailValue && passwordValue && nameValue && phoneNumberValue)
    );
  });



  return (
    <>
      <Header />
      <div className="auth">
        <DesktopAuthPrompt signup />
        <div className="auth-body body">
          <div className="auth-form-fields">
            {error && <ErrorComponent error={error}/>}
            {successMessage && <SuccessComponent message={successMessage}/>}

            <form  onSubmit={(e) => handleSubmit(e)}>
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
              <button disabled={isDisabled}>
                Next
              </button>
            </form>

            <MobileAuthPrompt signup/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
