import Header from './Header';
import LaunchingSoonImage from './images/launching-soon.svg';
import { useState } from 'react';
import ErrorComponent from "./Error";

const ComingSoon = () => 
{

    const [waitlistJoined, setWaitlistJoined] = useState(false);
    const [error, setError] = useState(null);

    const formDetails = () => 
    {
        return (
            <div>
            <p>Get notified when this website goes live</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="email" required placeholder="E-mail" />
                <button>Notify Me</button>
            </form>
        </div>
        );
    }

    const successMessage = () => 
    {
        return (
            <div className="coming-soon-success-message">
                <p className="heading-text">You've successfully joined our waitlist</p>
                <p>You'll be the first to know when we launch</p>
            </div>
        );
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        const credentials = {email: e.target[0].value}

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        fetch('https://find-a-roomate.herokuapp.com/auth/join-waitlist/',
        {
            method: "POST",
            body: JSON.stringify(credentials),
            redirect: "follow",
            mode: "cors",
            headers: myHeaders
        })
        .then (async (res) => 
        {
            const body = await res.json();

            if(!res.ok)
            {
                throw new Error("Something unexpected happened. Please try again");
            }

            //remove error message
            setError()
            //show success message
            setWaitlistJoined(true);
        })
        .catch((error) => 
        {   
            //show error message
            setError(error.message);
            //remove success message
            setWaitlistJoined(false);
        });
    }

    return ( 
        <div className="coming-soon">
            <Header/>
            <div className="body coming-soon-body">
                <div className="hero">
                    <div className="text">
                        <h1>Find The Perfect Roommate ...</h1>
                        <p>Connect with several rommmates that match your requirements.</p>
                    </div>
                    
                    <div className="coming-soon-form">
                        {error && <ErrorComponent error={error} />}
                        { !waitlistJoined && formDetails()}
                        { waitlistJoined && successMessage()}
                    </div>
                    
                </div>
                <div className="launching-soon-image desktop-only">
                    <img src={LaunchingSoonImage} />

                </div>
               
            </div>
        </div>
     );
}
 
export default ComingSoon;