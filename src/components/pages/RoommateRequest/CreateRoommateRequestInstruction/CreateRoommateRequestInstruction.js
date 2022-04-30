import OnboardingInstruction from "../../../templates/OnboardingInstruction/OnboardingInstruction";
import img from "./../../../../images/make-roomate-request-section.svg";

const CreateRooomateRequestInstruction = () => 
{
    const title = "CREATE ROOMMATE REQUEST";
    const description = `We are aware that searching for an ideal roommate might be hard at times. We
                        are here to save the stress. Only give us some information about your room and we’ll post
                        it live on our website. You’ll soon be able to connect to potential roommates!`;
    const url = "/room-location";
    const linkText = "Get started now";
    return ( 
        <OnboardingInstruction
            title={title}
            img = {img}
            description = {description}
            url = {url}
            linkText = {linkText}
        />
     );
}
 
export default CreateRooomateRequestInstruction;