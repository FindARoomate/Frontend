import CreateProfileThankYouTemplate from "../../../templates/CreatePersonalProfileTemplate/CreateProfileThankYouTemplate/CreateProfileThankYouTemplate";
import image from './../../../../images/create-roommate-request-thankyou.svg';

const CreateRoommateRequestThankYou = () => 
{
    const title = "You have successfully created a roommate request.";
    const subtitle = "Your ideal roommate will connect with you soon. Kindly keep an eye on your inbox.";
    const link1 = 
    {
        text: "View roommate requests",
        link: "/create-roommate-request-instruction"
    };
    const link2 = 
    {
        text: "Create another request",
        link: "/create-roommate-request-instruction"
    };
    return ( 
        <CreateProfileThankYouTemplate
            title = {title}
            subtitle = {subtitle}
            link1 = {link1}
            link2 = {link2}
            image = {image}
        />
     );
}
 
export default CreateRoommateRequestThankYou;