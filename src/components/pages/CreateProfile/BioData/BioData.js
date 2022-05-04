import Img from './../../../ui/atoms/Img/Img';
import { Navigate } from 'react-router-dom';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import CreatePersonalProfileTemplate from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';
import { useState } from 'react';

const BioData = () => 
{

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const inputs = 
    [
        {
            key: 1,
            label: "Name",
            inputName: "name",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "Firstname Lastname",
            value: localStorage.getItem("name")
        },
        {
            key: 2,
            label: "Email",
            inputName: "email",
            inputCategory: "input",
            inputType: "email",
            inputPlaceholder: "youremail@gmail.com",
            value: localStorage.getItem("email")
        },
        {
            key: 3,
            label: "Phone Number",
            inputName: "phone_number",
            inputCategory: "input",
            inputType: "number",
            inputPlaceholder: "",
            value: localStorage.getItem("phone_number")
        },
        {
            key: 4,
            label: "Gender",
            inputCategory: "select",
            inputName: "gender",
            value: localStorage.getItem("gender"),
            data:
            {
                key: 1,
                name: "Gender",
                values: ["Male", "Female"]
            }
        },
        {
            key: 5,
            label: "Date of birth",
            inputName: "date_of_birth",
            inputCategory: "input",
            inputType: "date",
            inputPlaceholder: "",
            value: localStorage.getItem("date_of_birth")
        },
    ]

    const button = <Button>Next <Img src={icon}/> </Button>
    const navClasses = 
    [
        createPersonalProfileStyles.active,
        createPersonalProfileStyles.notVisited, 
        createPersonalProfileStyles.notVisited
    ];

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        localStorage.setItem("name", e.target[0].value);//save name to localStorage
        localStorage.setItem("email", e.target[1].value);//save name to localStorage
        localStorage.setItem("phone_number", e.target[2].value);//save name to localStorage
        localStorage.setItem("gender", e.target[3].value);//save name to localStorage
        localStorage.setItem("date_of_birth", e.target[4].value);//save name to localStorage
       
        setIsFormSubmitted(true);
    }

    return ( 
        <>
            {/* Direct to tell us about yourself screen */}
            {isFormSubmitted && <Navigate replace to="/about-yourself"/>}

            <CreatePersonalProfileTemplate
                inputs = {inputs}
                button = {button}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
            />
        </>
     );
}
 
export default BioData;