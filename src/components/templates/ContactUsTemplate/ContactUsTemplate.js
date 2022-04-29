import styles from './ContactUsTemplate.module.css';
import globalStyles from './../../../components/globalStyles.module.css';
import ContactTag from '../../ui/molecules/ContactTag/ContactTag';
import H3 from '../../ui/atoms/Headings/H3/H3';
import H1 from '../../ui/atoms/Headings/H1/H1';
import P from '../../ui/atoms/P/P';
import ContactUsTemplateForm from '../../ui/organisms/ContactUsTemplateForm/ContactUsTemplateForm';

const ContactUsTemplate = ({preheading, heading, subheading, contactFields}) => 
{
    return ( 
        <div className={styles.contact}>
            <div className= {`${globalStyles.body} ${styles.contactBody}`}>
                <div>
                    <H3>{preheading.text}</H3>
                    <H1>{heading.text}</H1>
                    <P>{subheading.text}</P>

                    {/* Get All Contact Fields */}
                    {contactFields.map( (contact) => 
                        {
                            return (
                            <ContactTag 
                                key = {contact.key}
                                icon = {contact.icon}
                                name = {contact.name}
                                value = {contact.value}
                            />)
                        }
                    )}  
                    
                </div>

                <div className={styles.contactForm}>
                    <ContactUsTemplateForm/>
                </div>           

        </div>
    </div>

     );
}
export default ContactUsTemplate;