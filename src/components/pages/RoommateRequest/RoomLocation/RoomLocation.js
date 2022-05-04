import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import icon from './../../../../icons/right-arrow-icon.svg';
import Button from "../../../ui/atoms/Button/Button";
import Img from './../../../ui/atoms/Img/Img';
import { Navigate } from "react-router-dom";
import { useState } from "react";

const RoomLocation = () => 
{
    const inputs = 
    [
        {
            key: 1,
            label: "Country",
            inputCategory: "select",
            inputName: "country",
            required: true,
            value: localStorage.getItem("country"),
            data:
            [
                {key: 1, label: "Algeria", value: "Algeria"},
                {key: 2, label: "Angola", value: "Angola"},
                {key: 3, label: "Benin", value: "Benin"},
                {key: 4, label: "Botswana", value: "Botswana"},
                {key: 5, label: "Burkina Faso", value: "Burkina Faso"},
                {key: 6, label: "Burundi", value: "Burundi"},
                {key: 7, label: "Cameroon", value: "Cameroon"},
                {key: 8, label:  "Cape Verde", value:  "Cape Verde"},
                {key: 9, label: "Central African Republic", value: "Central African Republic"},
                {key: 10, label: "Chad", value: "Chad"},
                {key: 11, label: "Comoros", value: "Comoros"},
                {key: 12, label: "Nigeria", value: "Nigeria"},
            ]
        },
        {
            key: 2,
            label: "State",
            inputCategory: "select",
            inputName: "state",
            required: true,
            value: localStorage.getItem("state"),
            data:
            [
                {key: 1, label: "Algeria", value: "Algeria"},
                {key: 2, label: "Angola", value: "Angola"},
                {key: 3, label: "Benin", value: "Benin"},
                {key: 4, label: "Botswana", value: "Botswana"},
                {key: 5, label: "Burkina Faso", value: "Burkina Faso"},
                {key: 6, label: "Burundi", value: "Burundi"},
                {key: 7, label: "Cameroon", value: "Cameroon"},
                {key: 8, label:  "Cape Verde", value:  "Cape Verde"},
                {key: 9, label: "Central African Republic", value: "Central African Republic"},
                {key: 10, label: "Chad", value: "Chad"},
                {key: 11, label: "Comoros", value: "Comoros"},
                {key: 12, label: "Nigeria", value: "Nigeria"},
            ]
        },
        {
            key: 3,
            label: "City",
            inputCategory: "select",
            inputName: "city",
            required: true,
            value: localStorage.getItem("city"),
            data:
            [
                {key: 1, label: "Algeria", value: "Algeria"},
                {key: 2, label: "Angola", value: "Angola"},
                {key: 3, label: "Benin", value: "Benin"},
                {key: 4, label: "Botswana", value: "Botswana"},
                {key: 5, label: "Burkina Faso", value: "Burkina Faso"},
                {key: 6, label: "Burundi", value: "Burundi"},
                {key: 7, label: "Cameroon", value: "Cameroon"},
                {key: 8, label:  "Cape Verde", value:  "Cape Verde"},
                {key: 9, label: "Central African Republic", value: "Central African Republic"},
                {key: 10, label: "Chad", value: "Chad"},
                {key: 11, label: "Comoros", value: "Comoros"},
                {key: 12, label: "Nigeria", value: "Nigeria"},
            ]
        },
        {
            key: 5,
            label: "Street Address",
            inputCategory: "textarea",
            inputName: "street_address",
            required: true,
            inputPlaceholder: "E.g 59, Baptist Street, Off Ademulegun road, NEPA, Ondo.",
            value: localStorage.getItem("street_address")
        },
    ];

    const nextButton = <Button>Next <Img src={icon}/></Button>

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
        e.preventDefault();
        setIsFormSubmitted(true);
    }

    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }

    return ( 
        <>
            {isFormSubmitted && <Navigate replace to="/room-details"/>}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "Where is your room located?"
                handleInputChange={handleInputChange}
            />
        </>
        
     );
}
 
export default RoomLocation;