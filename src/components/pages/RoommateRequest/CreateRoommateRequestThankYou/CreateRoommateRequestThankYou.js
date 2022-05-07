import CreateProfileThankYouTemplate from "../../../templates/CreatePersonalProfileTemplate/CreateProfileThankYouTemplate/CreateProfileThankYouTemplate";
import image from './../../../../images/create-profile-success-image.svg';

const CreateRoommateRequestThankYou = () => 
{
    const title = "You have successfully created a roommate request!";
    // const subtitle = "CheckYou can now proceed to creating a roommate request!";
    const link1 = 
    {
        text: "View Roommate Request",
        link: "/create-roommate-request-instruction"
    };
    const link2 = 
    {
        text: "Create New Request",
        link: "/create-roommate-request-instruction"
    };
    return ( 
        <CreateProfileThankYouTemplate
            title = {title}
            // subtitle = {subtitle}
            link1 = {link1}
            link2 = {link2}
            image = {image}
        />
     );
}
 
export default CreateRoommateRequestThankYou;