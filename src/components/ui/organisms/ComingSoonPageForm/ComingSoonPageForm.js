import FormGroup from '../../molecules/FormGroup/FormGroup';
import styles from './ComingSoonPageForm.module.css';
import WaitlistSuccessMessage from '../../molecules/WaitlistSuccessMessage/WaitlistSuccessMessage';
import { useState } from 'react';
import ErrorAlert from '../../molecules/Alerts/ErrorAlert/ErrorAlert' ;

const ComingSoonPageForm = () => {

    const [waitlistJoined, setWaitlistJoined] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) =>
    {
        //prevent form submit
        e.preventDefault();

        //set loading message
        setIsLoading(true);
        
        const credentials = 
        {
            email: e.target[0].value, 
            name:  e.target[1].value
        }
        console.log(credentials);
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
                console.log(body);
                var errorMessage = body.message;
                errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);//capitalize first letter
                throw new Error(errorMessage);
            }

            //remove loading message
            setIsLoading(false)
            //remove error message
            setError()
            //show success message
            setWaitlistJoined(true);
        })
        .catch((error) => 
        {   
            //remove loading message
            setIsLoading(false);
            //show error message
            setError(error.message);
            //remove success message
            setWaitlistJoined(false);
        });
    }

    const inputs = 
    [
        {
            "key": 1,
            "type": "email",
            "name": "email",
            "placeholder": "E-mail",
            "required": true
        },
        {
            "key": 2,
            "type": "text",
            "name": "name",
            "placeholder": "First Name",
            "required": true
        }
    ];

    const p = 
    {
        "content": "Get notified when this website goes live",
        "customStyle": {color:"#7D7D7D"}
    }

    const button = 
    {
        "content": "Join Waitlist"
    }

    return ( 

        <div className={styles.comingSoonPageForm}>
            {error && <ErrorAlert message={error}/>}
            {!waitlistJoined && (<FormGroup inputs={inputs} p = {p} button = {button} isLoading={isLoading} handleSubmit = {handleSubmit}/>)}
            {waitlistJoined && <WaitlistSuccessMessage/>}
        </div>
        
     );
}
 
export default ComingSoonPageForm;