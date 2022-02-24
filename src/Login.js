import Header from './Header';
import {useState, useEffect} from 'react';
import Button from './assets/Button';
import { Link } from 'react-router-dom';
import googleIcon from './icons/google-icon.svg';
import loginImage from './images/login-image.svg';
import closedEyeIcon from './icons/closed-eye-icon.svg';

const Login = () => {

    const [passwordInputType, setPasswordInputType] = useState('password');
    const [revealPasswordDisplay, setRevealPasswordDisplay] = useState('block');
    const [concealPasswordDisplay, setConcealPasswordDisplay] = useState('none');
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailValue, setEmail] = useState(null);
    const [passwordValue, setPassword] = useState(null);

    const handleEmailChange = (emailValue) => 
    {
        setEmail(emailValue)
        console.log(emailValue)
    }

    const handlePasswordChange = (passwordValue) => 
    {
        setPassword(passwordValue)
    }

    const handleRevealPassword = () => 
    {
        setPasswordInputType('text');
        setRevealPasswordDisplay('none');
        setConcealPasswordDisplay('block')
    }

    const handleConcealPassword = () => 
    {
        setPasswordInputType('password');
        setRevealPasswordDisplay('block');
        setConcealPasswordDisplay('none')
    }

    useEffect(() => {
        setIsDisabled(!(emailValue && passwordValue))
      });

      
    return ( 
        <div className="auth">
            <Header/>
            <div className="body auth-body login-body">
                <div className='auth-headers'>
                    <h1>LOGIN</h1>
                    <p className="gray">Welcome Back</p>
                    <img src={loginImage} alt="Login"/>
                    <div className="desktop-only-additionals additionals">
                        <span className="divider"> <span>or</span> </span>
                        <span className='alternative-login'>
                            Continue with <img src={googleIcon} />
                        </span>
                        <span>
                        Create new account? <Link to='/sign-up'><span className="auth-link">Sign up</span></Link>
                        </span>
                    </div>        
                </div>
               
                <div className='auth-form-fields'>
                    <form action="#">
                        <div>
                            <label>Email</label>
                            <input name="email" type="email" onChange={ (e) => handleEmailChange(e.target.value) } required/>
                        </div>
                        <div>
                            <label>Password</label>
                            <span className="passwordInput">
                                <input name="password" type={passwordInputType} onChange={(e) => handlePasswordChange(e.target.value)} required/>
                                {/* Display Password Eye Icon */}
                                <img
                                style={{
                                    display: revealPasswordDisplay
                                }}
                                src={closedEyeIcon} 
                                onClick={handleRevealPassword}
                                />

                                {/* Conceal Password Eye Icon */}
                                <img
                                style={{
                                    display: concealPasswordDisplay
                                }}
                                src={closedEyeIcon} 
                                onClick={handleConcealPassword}
                                />
                            </span>
                            
                            {/* <img src={openEyeIcon} class="concealPassword"/> */}
                        </div>  
                        <button disabled={isDisabled} link='/sign-up'>Login</button>
                    </form>
                    <a href="#" className='italics blue forgot-password'>Forgot password</a>

                    <div className="mobile-only-additionals additionals">
                        <span className="divider"> <span>or</span> </span>
                        <span className='alternative-login'>
                            Continue with <img src={googleIcon} />
                        </span>
                        <span>
                        Create new account? <Link to='/sign-up'><span className="auth-link">Sign up</span></Link>
                        </span>
                    </div>        
                </div>
                       
            </div>
        </div>
     );
}
 
export default Login;