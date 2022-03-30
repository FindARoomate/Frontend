import ComingSoonTemplate from '../../templates/ComingSoonTemplate/ComingSoonTemplate'
import LaunchingSoonImage from '../../../images/launching-soon.svg';

const ComingSoon = () => {
    return ( 

        <div>
            <ComingSoonTemplate
                headingText="Find The Perfect Roommate..."
                subText = "Connect with several roommates that match your requirements"
                image = {LaunchingSoonImage}
            />
        </div>
     );
}
 
export default ComingSoon;