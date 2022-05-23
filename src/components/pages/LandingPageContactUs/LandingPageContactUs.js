import ContactUsTemplate from "../../templates/ContactUsTemplate/ContactUsTemplate";
import mobileContactIcon from './../../../icons/mobile-contact-icon.svg';

const LandingPageContactUs = () => 
{
    const contact = 
    {
        preheading:
        {
            text: "CONTACT US",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        heading: 
        {
            text: "How can we help you?",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        subheading: 
        {
            text: "Fill the form or send an email",
            customStyle: 
            {
                fontSize: "40px",
                fontFamily: "Open Sans",
                fontWeight: "600",
                textAlign: "center",
                color: "black",
            }
        },
        contactFields:
        [
            {
                key: 1,
                name: "Email Address",
                icon: mobileContactIcon,
                value: "contact@findaroommate.com"
            }
        ],
    }

    return ( 
        <ContactUsTemplate
            preheading = {contact.preheading}
            heading = {contact.heading}
            subheading = {contact.subheading}
            contactFields = {contact.contactFields}
        />
     );
}
 
export default LandingPageContactUs;