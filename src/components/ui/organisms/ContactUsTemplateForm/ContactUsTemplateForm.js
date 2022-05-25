import { CONTACT } from "../../../routes";
import usePost from "../../../../customHooks/usePost";
import FormGroup from "../../molecules/FormGroup/FormGroup";
import styles from './ContactUsTemplateForm.module.css';
import { useEffect, useState, memo } from "react";
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

    const {APIdata, isError, isSuccess, sendPostRequest} = usePost(CONTACT)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", e.target[0].value);
        formData.append("email", e.target[1].value);
        formData.append("message", e.target[2].value);

        sendPostRequest(formData);
    }

    useEffect(() => 
    {
        if(isError || isSuccess)
        {
            setIsLoading(false);
        }

    }, [APIdata, isError, isSuccess])

    return ( 
        <div className={styles.contactForm}>
            {isSuccess && (
            <div className={styles.alert}>
                <SuccessAlert message={APIdata.success}/>
            </div>)}
            
            {isError && (
            <div className={styles.alert}>
                <ErrorAlert> {APIdata.error}</ErrorAlert>
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
 
export default memo(ContactUsTemplateForm);