import { CONTACT } from "../../../routes";
import usePost from "../../../../customHooks/usePost";
import FormGroup from "../../molecules/FormGroup/FormGroup";
import styles from './ContactUsTemplateForm.module.css';
import { useEffect, useState } from "react";
import ErrorAlert from "./../../molecules/Alerts/ErrorAlert/ErrorAlert";
import SuccessAlert from "./../../molecules/Alerts/SuccessAlert/SuccessAlert";

const ContactUsTemplateForm = () => 
{

    const [isLoading, setIsLoading] = useState(false);

    const button = {content: "Submit"}
    const inputs = 
    [
        {
            "key": 1,
            "type": "text",
            "placeholder": "Name",
            "required": true
        },
        {
            "key": 2,
            "type": "email",
            "placeholder": "Email",
            "required": true
        }
    ]

    const textareas = 
    [
        {
            "key": 1,
            "type": "text",
            "placeholder": "Message",
            "required": true
        },
    ]

    const {data, isError, isSuccess, sendPostRequest} = usePost(CONTACT)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setIsLoading(true);
        let credentials = 
        {
            name: e.target[0].value,
            email: e.target[1].value,
            message: e.target[2].value
        }

        sendPostRequest(credentials);
    }

    useEffect(() => 
    {
        if(isError || isSuccess)
        {
            setIsLoading(false);
        }

    }, [data, isError, isSuccess])

    return ( 
        <div className={styles.contactForm}>
            {isSuccess && (<div className={styles.alert}>
                                <SuccessAlert message={data.success}/>
                            </div>)}
            
            {isError && (<div className={styles.alert}>
                                <ErrorAlert message={data.error}/>
                            </div>)}
            <FormGroup
                inputs = {inputs}
                button = {button}
                textareas = {textareas}
                handleSubmit = {handleSubmit}
                isLoading = {isLoading}
            />
        </div>
     );
}
 
export default ContactUsTemplateForm;