import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import icon from './../../../../icons/right-arrow-icon.svg';
import Button from "../../../ui/atoms/Button/Button";
import Img from './../../../ui/atoms/Img/Img';
import { Link,Navigate } from "react-router-dom";
import { useState } from "react";

const RoomPricing = () => 
{
    const inputs = 
    [
        {
            key: 1,
            label: "How soon can your roommate move in?",
            inputName: "how_soon_roommate_can_move_in",
            inputCategory: "input",
            inputType: "date",
            inputPlaceholder: "Select a date",
            required: true,
            value: localStorage.getItem("how_soon_roommate_can_move_in")
        },
        {
            key: 2,
            label: "What's the yearly rent?",
            inputName: "rent_per_person",
            inputCategory: "input",
            inputType: "number",
            inputPlaceholder: "E.g #120,000 yearly, blease type in the number of roommates you currently have",
            required: true,
            value: localStorage.getItem("rent_per_person")
        },
        {
            key: 3,
            label: "Are there additional costs?",
            inputName: "additional_cost",
            inputCategory: "textarea",
            inputPlaceholder: "E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour.",
            required: true,
            value: localStorage.getItem("additional_cost")
        },
    ];

    const prevButton = <Link to="/room-details"><Button>Previous</Button></Link>
    const nextButton = <Button>Next <Img src={icon}/></Button>

    const navClasses = 
    [
        style.visited,
        style.visited,
        style.active,
        style.notVisited
    ];

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setIsFormSubmitted(true);
    }

    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }
    
    return ( 
        <>
            {isFormSubmitted && <Navigate replace to="/room-look"/>}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                prevButton = {prevButton}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "Move-in date and pricing"
                handleInputChange={handleInputChange}
            />
        </>
        
     );
}
 
export default RoomPricing;