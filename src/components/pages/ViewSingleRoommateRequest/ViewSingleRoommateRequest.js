import { useParams } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';
import { GET_SINGLE_ROOMMATE_REQUEST } from '../../routes';
import ViewSingleRoommateRequestTemplate from "../../templates/ViewSingleRoommateRequestTemplate/ViewSingleRoommateRequestTemplate";

const ViewSingleRoommateRequest = () => 
{

    const {id} = useParams();
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + "/";
    var {isError, isSuccess, APIData} = useGet(url);

    const header = "Female roommate needed in a self contain at Agbowo";
    const user = 
    {
        id: 1,
        name: "Precious Faseyosan",
        occupation: "Student",
        age_group: "20 - 25",
        gender: "Female",
        personality_type: "Introvert",
        bio: "I am a church girl. I sleep for 10 hours everyday. I cannot live with someone with body odor and smelling mouth"
    }
    const room_type = "2 Bedroom Flat";
    const rent_per_person = "₦100,000.00/Year";
    const additional_cost = "₦10,000.00 Monthly Electricity";
    const availability = "1st, May 2022";
    const no_of_persons = "2"
    const no_of_current_roomies ="1"
    const amenities = ['Washing Machine', 'Balcony', 'Reading table & chair', 'Home theatre'];
    const street = "12, Alagbaka street, Akure"
    const state = "Ondo State"
    const country = "Nigeria"
    const latitude = -0.481747846041145;
    const longitude = 51.3233379650232;
    const additional_information = "I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me. I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me. I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me."

    const roommateRequest = 
    {
        header,
        user,
        room_type,
        rent_per_person,
        additional_cost,
        availability,
        no_of_persons,
        no_of_current_roomies,
        amenities,
        street,
        state,
        country,
        latitude,
        longitude,
        additional_information
    }

    if(APIData) APIData["user"] = user;

    if(APIData)
    {
        return ( 
            <ViewSingleRoommateRequestTemplate
            roommateRequest = {APIData}
            />
         );
    }else 
    {
        return "Loading..."
    }
    
}
 
export default ViewSingleRoommateRequest;