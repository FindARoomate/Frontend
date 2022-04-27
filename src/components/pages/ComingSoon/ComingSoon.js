import ComingSoonTemplate from '../../templates/ComingSoonTemplate/ComingSoonTemplate'
import LaunchingSoonImage from '../../../images/launching-soon.svg';

const ComingSoon = () => {
    return ( 

        <div>
            <ComingSoonTemplate
                headingText="Find The Perfect Roommate..."
                subText = "Saving you the stress of looking for an ideal roommate all by yourself"
                image = {LaunchingSoonImage}
            />
        </div>
     );
}
 
export default ComingSoon;