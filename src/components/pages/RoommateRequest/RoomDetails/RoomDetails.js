import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import icon from './../../../../icons/right-arrow-icon.svg';
import Button from "../../../ui/atoms/Button/Button";
import Img from './../../../ui/atoms/Img/Img';
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const RoomDetails = () => 
{
    const convertToObject = (string) => 
    {
        if(string)
        {
            return string.split(",");
        }
    }

    const amenitiesArray = convertToObject(localStorage.getItem("amenities"))

    const inputs = 
    [
        {
            key: 1,
            label: "Room Type",
            inputCategory: "select",
            inputName: "room_type",
            required: true,
            value: localStorage.getItem("room_type"),
            data:
            [
                {key: 1, label: "Self Contain", value: "Self Contain"},
                {key: 2, label: "2 Bedroom Flat", value: "2 Bedroom Flat"},
                {key: 3, label: "3 Bedroom Flat", value: "3 Bedroom Flat"},
                {key: 4, label: "Shortlet", value: "Shortlet"},
                {key: 5, label: "Single Room Apartment", value: "Single Room Apartment"},
            ]
        },
        {
            key: 2,
            label: "No of persons to occupy the apartment",
            inputName: "no_of_persons_to_occupy_apartment",
            inputCategory: "input",
            inputType: "number",
            required: true,
            inputPlaceholder: "Please type in the total number of occupants in your room/apartment",
            value: localStorage.getItem("no_of_persons_to_occupy_apartment")
        },
        {
            key: 3,
            label: "No of current roommates/flatmates",
            inputName: "no_of_current_roommates",
            inputCategory: "input",
            inputType: "number",
            required: true,
            inputPlaceholder: "Please type in the number of roommates you currently have",
            value: localStorage.getItem("no_of_current_roommates")
        },
        {
            key: 4,
            label: "Amenities: Kindly select all that apply",
            inputName: "amenities",
            inputCategory: "checkboxInput",
            value: amenitiesArray,
            data:
            [
                {key: 1, label: "Personal bathroom", value: "Personal bathroom"},
                {key: 2, label: "Washing Machine", value: "Washing Machine"},
                {key: 3, label: "Wifi", value: "Wifi"},
                {key: 4, label: "Solar Inverter", value: "Solar Inverter"},
                {key: 5, label: " Balcony", value: " Balcony"},
                {key: 6, label: "Cooker", value: "Cooker"},
                {key: 7, label: "Reading table & chair", value: "Reading table & chair"},
                {key: 8, label: "Basketball court", value: "Basketball court"},
                {key: 9, label: "Refrigirator", value: "Refrigirator"},
                {key: 10, label: "Air Condition", value: "Air Condition"},
                {key: 11, label: "Home theatre", value: "Home theatre"},
                {key: 12, label: "Gym", value: "Gym"},
                {key: 13, label: "Others", value: "Others"},
            ]
                    
        },
    ];

    const prevButton = <Link to="/room-location"><Button>Previous</Button></Link>
    const nextButton = <Button>Next <Img src={icon}/></Button>

    const navClasses = 
    [
        style.visited,
        style.active,
        style.notVisited,
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

    const handleCheckboxChange = (name, data) => 
    {
        //converting the checkbox values in an array into a comma separated string so we can store in localStorage
        console.log(data);
        var checkboxString = "";
        data.forEach((key) => 
        {
            checkboxString += key + ",";
        });

        localStorage.setItem(name, checkboxString)
    }

    return ( 
        <>
            {isFormSubmitted && <Navigate replace to="/room-pricing"/>}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                prevButton = {prevButton}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "Let's know the details of the room."
                handleInputChange={handleInputChange}
                handleCheckboxChange = {handleCheckboxChange}
                defaultCheckboxArray = {amenitiesArray}
            />
        </>
        
     );
}
 
export default RoomDetails;