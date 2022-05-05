import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import Button from "../../../ui/atoms/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePost from "../../../../customHooks/usePost";
import { CREATE_ROOMMATE_REQUEST } from "../../../routes";

const RoomLook = () => 
{
    const inputs = 
    [
        {
            key: 2,
            label: "Add a suitable title for your room listing",
            inputName: "room_listing_title",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "E.g 5 bedroom flat in Bodija, Ibadan.",
            required: true,
            value: localStorage.getItem("room_listing_title")
        },
        {
            key: 3,
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

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_ROOMMATE_REQUEST);

    const handleSubmit = (e) => 
    {
        e.preventDefault();

        //
        // setIsFormSubmitted(true);
    }

    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }
    return ( 
        <>
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