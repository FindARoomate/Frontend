import ContactUsTemplateForm from '../../ui/organisms/ContactUsTemplateForm/ContactUsTemplateForm';
import globalStyles from './../../../components/globalStyles.module.css';
import ContactTag from '../../ui/molecules/ContactTag/ContactTag';
import styles from './ContactUsTemplate.module.css';
import H3 from '../../ui/atoms/Headings/H3/H3';
import H1 from '../../ui/atoms/Headings/H1/H1';
import P from '../../ui/atoms/P/P';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ContactUsTemplate = ({preheading, heading, subheading, contactFields}) => 
{
    AOS.init();//intilize on scroll animation

    return ( 
        <div className={styles.contact}>
            <div className= {`${globalStyles.body} ${styles.contactBody}`}>
                <div>
                    <H3
                        data-aos="zoom-in"
                        data-aos-duration="800"
                        data-aos-delay="400"
                    >
                        {preheading.text}
                    </H3>
                    <H1
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                    >
                        {heading.text}
                    </H1>
                    <P
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-delay="800"
                    >
                        {subheading.text}
                    </P>

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

                <div
                    data-aos="fade-left"
                    data-aos-duration="1500"
                    className={styles.contactForm}
                 >
                    <ContactUsTemplateForm/>
                </div>           

        </div>
    </div>

     );
}
export default ContactUsTemplate;