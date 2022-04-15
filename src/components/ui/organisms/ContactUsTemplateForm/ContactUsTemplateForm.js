import FormGroup from "../../molecules/FormGroup/FormGroup";
import styles from './ContactUsTemplateForm.module.css';

const ContactUsTemplateForm = () => {

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
    return ( 
        <div className={styles.contactForm}>
            <FormGroup
                inputs = {inputs}
                button = {button}
                textareas = {textareas}
            />
        </div>
     );
}
 
export default ContactUsTemplateForm;