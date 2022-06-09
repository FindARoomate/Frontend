import useGet from "../../../customHooks/useGet";
import { GET_PROFILE } from "../../routes";
import ProfileTemplate from "../../templates/ProfileTemplate/ProfileTemplate";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context";

const Profile = () => 
{
    return ( 
        <ProfileTemplate/>
     );
}
 
export default Profile;