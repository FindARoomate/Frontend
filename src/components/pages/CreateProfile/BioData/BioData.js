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
            inputName: "fullname",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "Firstname Lastname",
            required: true,
            value: localStorage.getItem("fullname")
        },
        {
            key: 2,
            label: "Email",
            inputName: "email",
            inputCategory: "input",
            inputType: "email",
            inputPlaceholder: "youremail@gmail.com",
            required: true,
            value: localStorage.getItem("email")
        },
        {
            key: 3,
            label: "Phone Number",
            inputName: "phone_number",
            inputCategory: "input",
            inputType: "number",
            inputPlaceholder: "+234123345567",
            required: true,
            value: localStorage.getItem("phone_number")
        },
        {
            key: 4,
            label: "Gender",
            inputCategory: "select",
            inputName: "gender",
            required: true,
            value: localStorage.getItem("gender"),
            data:
            [
                {key: 1, label: "Male", value: "MALE"},
                {key: 2, label: "Female", value: "FEMALE"}
            ]
        },
        {
            key: 5,
            label: "Age Range",
            inputName: "age_range",
            inputCategory: "select",
            required: true,
            value: localStorage.getItem("age_range"),
            data:
            [
                {key: 1, label: "< 16", value: "< 16"},
                {key: 2, label: "16 - 20", value: "16 - 20"},
                {key: 3, label: "21 - 25", value: "21 - 25"},
                {key: 4, label: "25 - 30", value: "25 - 30"},
                {key: 5, label: "> 30", value: "> 30"}
            ]
        },
    ]

    const nextButton = <Button>Next <Img src={icon}/> </Button>
    const navClasses = 
    [
        createPersonalProfileStyles.active,
        createPersonalProfileStyles.notVisited, 
        createPersonalProfileStyles.notVisited
    ];

    
    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setIsFormSubmitted(true);
    }

    return ( 
        <>
            {/* Direct to tell us about yourself screen */}
            {isFormSubmitted && <Navigate replace to="/about-yourself"/>}

            <CreatePersonalProfileTemplate
                inputs = {inputs}
                nextButton = {nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                handleInputChange = {handleInputChange}
            />
        </>
     );
}
 
export default BioData;