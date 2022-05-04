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
            data:
            {
                key: 1,
                name: "Country",
                values: 
                [
                    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", 
                    "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros", "Nigeria"
                ]
            }
        },
        {
            key: 2,
            label: "State",
            inputCategory: "select",
            inputName: "state",
            required: true,
            data:
            {
                key: 1,
                name: "State",
                values: 
                [
                    'Abuja',
                    'Abia',
                    'Adamawa',
                    'Akwa Ibom',
                    'Anambra',
                    'Bauchi',
                    'Bayelsa',
                    'Benue',
                    'Borno',
                    'Cross River',
                    'Delta',
                    'Ebonyi',
                    'Edo',
                    'Ekiti',
                    'Enugu',
                    'Gombe',
                    'Imo',
                    'Jigawa',
                    'Kaduna',
                    'Kano',
                    'Katsina',
                    'Kebbi',
                    'Kogi',
                    'Kwara',
                    'Lagos',
                    'Nassarawa',
                    'Niger',
                    'Ogun',
                    'Ondo',
                    'Osun',
                    'Oyo',
                    'Plateau',
                    'Rivers',
                    'Sokoto',
                    'Taraba',
                    'Yobe',
                    'Zamfara'
                ]
            }
        },
        {
            key: 3,
            label: "City",
            inputCategory: "select",
            inputName: "city",
            required: true,
            data:
            {
                key: 1,
                name: "City",
                values: 
                [ 
                    "Agege", "Ajegunle", "Akodo", "Apapa", "Badagry", "Ebute Ikorodu", "Ebute-Metta", "Ejirin", 
                    "Epe", "Festac Town", "Ifako", "Ikeja", "Ikorodu", "Ikotun", "Ikoyi", "Lagos", "Makoko", "Mushin",
                    "Ojota", "Oshodi", "Somolu", "Surulere"
                ]
            }
        },
        {
            key: 5,
            label: "Street Address",
            inputCategory: "textarea",
            required: true,
            inputPlaceholder: "E.g 59, Baptist Street, Off Ademulegun road, NEPA, Ondo."
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
    return ( 
        <>
            {isFormSubmitted && <Navigate replace to="/room-details"/>}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "Where is your room located?"
            />
        </>
        
     );
}
 
export default RoomLocation;