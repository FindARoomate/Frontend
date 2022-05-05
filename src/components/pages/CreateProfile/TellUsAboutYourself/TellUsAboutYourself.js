import { useState } from 'react';
import Img from './../../../ui/atoms/Img/Img';
import { Link, Navigate } from 'react-router-dom';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import CreatePersonalProfileTemplate from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';

const TellUsAboutYourself = () => 
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const inputs = 
    [
        {
            key: 1,
            label: "Religion",
            inputName: "religion",
            inputCategory: "select",
            value: localStorage.getItem("religion"),
            required: true,
            data:
            [
                {key: 1, label: "Christian", value: "CHRISTIANITY"},
                {key: 2, label: "Muslim", value: "ISLAM"},
                {key: 3, label: "Other", value: "OTHER"}
            ]
        },
        {
            key: 2,
            label: "Personality",
            inputName: "personality",
            inputCategory: "select",
            value: localStorage.getItem("personality"),
            required: true,
            data:                
            [
                {key: 1, label: "Introvert", value: "INTROVERT"},
                {key: 2, label: "Extrovert", value: "EXTROVERT"}
            ]
        },
        {
            key: 3,
            label: "Profession",
            inputName: "profession",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "e.g student / web developer / real estate manager",
            value: localStorage.getItem("profession"),
            required: true
        },
        {
            key: 4,
            label: "Short Bio",
            inputCategory: "textarea",
            inputName: "bio",
            inputPlaceholder: "E.g  I am a church girl and I love playing music out loud. Do not consider becoming my roommate if you hate loud music.",
            value: localStorage.getItem("bio"),
            required: true
        },
    ]

    const nextButton = <Button>Next <Img src={icon}/> </Button>
    const previousButton = <Link to="/bio-data"><Button>Previous</Button></Link>

    const navClasses = 
    [
        createPersonalProfileStyles.notVisited,
        createPersonalProfileStyles.active,
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
            {isFormSubmitted && <Navigate replace to="/ideal-roommate"/>}

             <CreatePersonalProfileTemplate
                inputs = {inputs}
                nextButton = {nextButton}
                previousButton = {previousButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                handleInputChange = {handleInputChange}
            />
        </>
       
     );
}
 
export default TellUsAboutYourself;