import OnboardingInstruction from "../../templates/OnboardingInstruction/OnboardingInstruction";
import createProfileImg from './../../../images/create-profile-section.svg';

const CreateProfileInstruction = () => 
{
    const title = "CREATE PERSONAL PROFILE";
    const description = `We are working hard to connect you to the perfect roommate for you.
    So, create your profile and we’ll match you with roommate(s) that fit your personality and lifestyle.`;
    const link="/bio-data"

    return ( 
        <OnboardingInstruction
            title={title}
            description={description}
            url = {link}
            linkText = "Get Started"
            img = {createProfileImg}
        />
     );
}
 
export default CreateProfileInstruction;