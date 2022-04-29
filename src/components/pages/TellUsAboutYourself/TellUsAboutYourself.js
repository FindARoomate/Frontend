import { useState } from 'react';
import Img from './../../ui/atoms/Img/Img';
import { Navigate } from 'react-router-dom';
import Button from '../../ui/atoms/Button/Button';
import icon from './../../../icons/right-arrow-icon.svg';
import CreatePersonalProfileTemplate from './../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';

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
            data:
            {
                key: 1,
                name: "Religion",
                values: ["Christian", "Muslim", "Other"]
            }         
        },
        {
            key: 2,
            label: "Personality",
            inputName: "personality",
            inputCategory: "select",
            data:
            {
                key: 1,
                name: "Personality",
                values: ["Introvert", "Extrovert"]
            }      
        },
        {
            key: 3,
            label: "Profession",
            inputName: "profession",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "e.g student / web developer / real estate manager"
        },
        {
            key: 4,
            label: "Short bio",
            inputCategory: "textarea",
            inputPlaceholder: "E.g  I am a church girl and I love playing music out loud. Do not consider becoming my roommate if you hate loud music."
        },
    ]

    const button = <Button>Next <Img src={icon}/> </Button>
    const navClasses = 
    [
        createPersonalProfileStyles.notVisited,
        createPersonalProfileStyles.active,
        createPersonalProfileStyles.notVisited 
    ];

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        localStorage.setItem("religion", e.target[0].value);//save name to localStorage
        localStorage.setItem("personality", e.target[1].value);//save name to localStorage
        localStorage.setItem("profession", e.target[2].value);//save name to localStorage
        localStorage.setItem("bio", e.target[3].value);//save name to localStorage       
        setIsFormSubmitted(true);
    }

    return ( 
        <>
            {/* Direct to tell us about yourself screen */}
            {isFormSubmitted && <Navigate replace to="/ideal-roommate"/>}

             <CreatePersonalProfileTemplate
                inputs = {inputs}
                button = {button}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
            />
        </>
       
     );
}
 
export default TellUsAboutYourself;