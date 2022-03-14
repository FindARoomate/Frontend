import { Link } from "react-router-dom";
import googleIcon from "./icons/google-icon.svg";

const MobileAuthPrompt = (props) => {
    return ( 
        <div className="mobile-only-additionals additionals">
        <span className="divider">
          {" "}
          <span>or</span>{" "}
        </span>
        <span className="alternative-login">
          Continue with <img src={googleIcon} />
        </span>
        {props.login ? 
        (
             <span>
             Create new account?{" "}
             <Link to="/sign-up">
               <span className="auth-link">Sign up</span>
             </Link>
           </span>
        ) : 
        (
            <span>
                Already have an account?{" "}
                <Link to="/login">
                  <span className="auth-link">Login</span>
                </Link>
              </span>
        )
        }
       
      </div>
     );
}
 
export default MobileAuthPrompt;