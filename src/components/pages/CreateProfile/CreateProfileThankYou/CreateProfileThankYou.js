import CreateProfileThankYouTemplate from "../../../templates/CreatePersonalProfileTemplate/CreateProfileThankYouTemplate/CreateProfileThankYouTemplate";
import image from './../../../../images/create-profile-success-image.svg';

const CreateProfileThankYou = () => 
{
    const title = "You have successfully created your profile.";
    const subtitle = "You can now proceed to creating a roommate request!";
    const link1 = 
    {
        text: "Create a roommate request now.",
        link: "/create-roommate-request-instruction"
    };
    const link2 = 
    {
        text: "Go to dashboard.",
        link: "/dashboard"
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
 
export default CreateProfileThankYou;