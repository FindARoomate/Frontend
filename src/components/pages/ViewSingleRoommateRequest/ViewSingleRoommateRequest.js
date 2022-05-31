import { useParams } from 'react-router-dom';
import useGet from '../../../customHooks/useGet';
import { GET_SINGLE_ROOMMATE_REQUEST } from '../../routes';
import ViewSingleRoommateRequestTemplate from "../../templates/ViewSingleRoommateRequestTemplate/ViewSingleRoommateRequestTemplate";
import { useState } from 'react';

const ViewSingleRoommateRequest = () => 
{

    // const {id} = useParams();
    // const url = GET_SINGLE_ROOMMATE_REQUEST + id + "/";
    // var {isError, isSuccess, APIData} = useGet(url);
    // console.log(APIData);

    const APIData = 
    {
        additional_cost: "No",
        additional_information: "no",
        amenities: ['Personal bathroom'],
        city: "Nigeria",
        country: "Nigeria",
        date_to_move: "2022-05-29",
        id: 1,
        is_active: false,
        latitude: -33.893736,
        listing_title: "3 bedroom",
        longitude: 151.212426,
        no_of_current_roomies: 3,
        no_of_persons: 4,
        profile:
        {
            age_range: "16 - 20",
            bio: "just go away",
            created_at: "2022-05-27 - 11:49:35",
            date_of_birth: "2022-05-27",
            fullname: "Precious Faseyosan",
            gender: "FEMALE",
            id: 1,
            image_url: "https://res.cloudinary.com/dczoldewu/svqw1cejgzayzmzcwgad",
            personality: "INTROVERT",
            phone_number: "2347034952994",
            profession: "CEO",
            religion: "CHRISTIANITY",
            roomate_description: "only have sense",
            roomie_age: "13",
            roomie_gender: "MALE",
            roomie_personality: "INTROVERT",
            roomie_religion: "CHRISTIANITY",
            updated_at: "2022-05-27 - 11:49:35",
        },
        rent_per_person: "120000.00",
        request_images: [
            {image_url: 'https://res.cloudinary.com/dczoldewu/offxjnehsg0waneyuaat'},
            {image_url: 'https://res.cloudinary.com/dczoldewu/akrf8ba9eztg9do6hxp2'},
            {image_url: 'https://res.cloudinary.com/dczoldewu/sauz9h4kop4m2okvgb8s'},
            {image_url: 'https://res.cloudinary.com/dczoldewu/hve3ggs7hmcrhjmbmlpb'},
            {image_url: 'https://res.cloudinary.com/dczoldewu/iqajuj7y3q6erolt1nbi'}
        ],
        room_type: "2 Bedroom Flat",
        state: "Nigeria",
        street_address: "59, Baptist Street,, Off Ademulegun Road, NEPA,"
    }

    return ( 
            <ViewSingleRoommateRequestTemplate
                roommateRequest = {APIData}
            />
        );

    
}
 
export default ViewSingleRoommateRequest;