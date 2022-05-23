import useGet from "../../../customHooks/useGet";
import { GET_PROFILE } from "../../routes";
import ProfileTemplate from "../../templates/ProfileTemplate/ProfileTemplate";

const Profile = () => 
{
    const token = localStorage.getItem("accessToken");
    const {APIData} = useGet(GET_PROFILE, token);

    console.log(APIData);
    
    return ( 
        <ProfileTemplate
            data={APIData}
        />
     );
}
 
export default Profile;