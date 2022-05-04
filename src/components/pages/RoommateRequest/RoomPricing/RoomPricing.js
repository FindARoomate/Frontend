import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import icon from './../../../../icons/right-arrow-icon.svg';
import Button from "../../../ui/atoms/Button/Button";
import Img from './../../../ui/atoms/Img/Img';
import { Navigate } from "react-router-dom";
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
            inputPlaceholder: "Select a date"
        },
        {
            key: 2,
            label: "What's the yearly rent?",
            inputName: "yearly_rent",
            inputCategory: "input",
            inputType: "number",
            inputPlaceholder: "E.g #120,000 yearly, blease type in the number of roommates you currently have"
        },
        {
            key: 3,
            label: "Are there additional costs?",
            inputCategory: "textarea",
            inputPlaceholder: "E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour."
        },
    ];

    const button = <Button>Next <Img src={icon}/></Button>
    const navClasses = 
    [
        style.active,
        style.notVisited,
        style.notVisited,
        style.notVisited 

    ];

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = (e) => 
    {
        setIsFormSubmitted(true);
    }
    return ( 
        <>
            {isFormSubmitted && <Navigate replace to="/room-details"/>}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                button = {button}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "Move-in date and pricing"
            />
        </>
        
     );
}
 
export default RoomPricing;