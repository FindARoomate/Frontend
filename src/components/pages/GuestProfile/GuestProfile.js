import { GET_GUEST_PROFILE } from "../../routes";
import useGet from "../../../customHooks/useGet";
import GuestProfileTemplate from "../../templates/GuestProfileTemplate/GuestProfileTemplate";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const GuestProfile = () => 
{
    const {id} = useParams();
    const {isSuccess, isError, APIData} = useGet(GET_GUEST_PROFILE + id + "/", localStorage.getItem("accessToken"));
    const [profile, setProfile] = useState(null);

    useEffect(() => 
    {
        // if(isSuccess || isError) console.log(APIData);

        if(APIData) setProfile(APIData);

    }, [isSuccess, isError, APIData]);

    return ( 
        <GuestProfileTemplate
            profile = {profile}
        />
     );
}
 
export default GuestProfile;