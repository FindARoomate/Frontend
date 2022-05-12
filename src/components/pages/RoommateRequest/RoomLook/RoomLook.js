import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import Button from "../../../ui/atoms/Button/Button";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePost from "../../../../customHooks/usePost";
import { CREATE_ROOMMATE_REQUEST } from "../../../routes";

const RoomLook = () => 
{

    const [isLoading, setIsLoading] = useState(false);
    const TOKEN = localStorage.getItem("accessToken");
    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_ROOMMATE_REQUEST, TOKEN);

    const convert_to_array = (data) => 
    {
        const data_array = data.split(",");

        const new_array = [];
        data_array.forEach((value) => 
        {
            if(value)
            {
                new_array.push(value);
            }
        })

        return new_array;
    }
    const inputs = 
    [
        {
            label: "Please add at least four pictures of different parts of your room e.g bedroom, kitchen, bathroom, balcony, etc. ",
            inputName: "room_images",
            inputCategory: "inputFile",
            required: true,
            value: localStorage.getItem("room_images")
        },
        {
            label: "Add a suitable title for your room listing",
            inputName: "listing_title",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "E.g 5 bedroom flat in Bodija, Ibadan.",
            required: true,
            value: localStorage.getItem("listing_title")
        },
        {
            label: "Additional Information",
            inputCategory: "textarea",
            inputName: "additional_information",
            inputPlaceholder: `I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.`,
            required: true,
            value: localStorage.getItem("additional_information")
        },
    ];

    const prevButton = <Link to="/room-pricing"><Button>Previous</Button></Link>
    const nextButton = <Button>Publish Request</Button>

    const navClasses = 
    [
        style.visited,
        style.visited,
        style.visited,
        style.active
    ];

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);


    const handleSubmit = (e) => 
    {
        e.preventDefault();     
        setIsLoading(true);
        const credentials = 
        {
            country: localStorage.getItem("country"),
            state: localStorage.getItem("state"),
            city: localStorage.getItem("city"),
            street_address: localStorage.getItem("street_address"),
            room_type: localStorage.getItem("room_type"),
            no_of_persons: localStorage.getItem("no_of_persons"),
            no_of_current_roomies: localStorage.getItem("no_of_current_roomies"),
            amenities: convert_to_array(localStorage.getItem("amenities")),
            rent_per_person: localStorage.getItem("rent_per_person"),
            additional_cost: localStorage.getItem("additional_cost"),
            listing_title: localStorage.getItem("listing_title"),
            additional_information: localStorage.getItem("additional_information")
        }   
        sendPostRequest(credentials);
    }

    useEffect(() => 
    {
        if(isSuccess)
        {
            // setIsFormSubmitted(true);

             //delete information from localstorage
            localStorage.removeItem("country");
            localStorage.removeItem("state");
            localStorage.removeItem("city");
            localStorage.removeItem("street_address");
            localStorage.removeItem("room_type");
            localStorage.removeItem("no_of_persons");
            localStorage.removeItem("no_of_current_roomies");
            localStorage.removeItem("amenities");
            localStorage.removeItem("rent_per_person");
            localStorage.removeItem("additional_cost");
            localStorage.removeItem("listing_title");
            localStorage.removeItem("additional_information");
        }
        
        if(isError)
        {
            console.log(APIdata);
        }
    }, [isSuccess, isError, APIdata])
       
    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }
    return ( 
        <>
            {isSuccess && (<Navigate to="/create-roommate-request-thankyou"/>)}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                prevButton = {prevButton}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "What does your room look like?"
                handleInputChange={handleInputChange}
            />
        </>
        
     );
}
 
export default RoomLook;