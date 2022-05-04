import { useState } from 'react';
import Img from './../../../ui/atoms/Img/Img';
import { Navigate } from 'react-router-dom';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import CreatePersonalProfileTemplate from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';

const DefineIdealRoommate = () => 
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const inputs = 
    [
        {
            key: 1,
            label: "I need a ________ roommate",
            inputName: "gender",
            inputCategory: "radioInput",
            data:
            [
                {key: 1, label: "Male", value: "Male"},
                {key: 2, label: "Female", value: "Female"}
            ]
                    
        },
        {
            key: 2,
            label: "I would like my roommate to be a",
            inputName: "religion",
            inputCategory: "radioInput",
            data:
            [
                {key: 1, label: "Christian", value: "Christian"},
                {key: 2, label: "Muslim", value: "Muslim"},
                {key: 3, label: "I don't mind", value: "I don't mind"}
            ]
                    
        },
        {
            key: 3,
            label: "I would like my roommate to be an",
            inputName: "personality",
            inputCategory: "radioInput",
            data:
            [
                {key: 1, label: "Introvert", value: "Introvert"},
                {key: 2, label: "Extrovert", value: "Extrovert"},
                {key: 3, label: "I don't mind", value: "I don't mind"}
            ]
                    
        },
        {
            key: 4,
            label: "My roommate should be of this age range",
            inputName: "ageRange",
            inputCategory: "radioInput",
            data:
            [
                {key: 1, label: "< 16", value: "< 16"},
                {key: 2, label: "16 - 20", value: "16 - 20"},
                {key: 3, label: "21 - 25", value: "21 - 25"},
                {key: 4, label: "25 - 30", value: "25 - 30"},
                {key: 5, label: "> 30", value: "> 30"},
            ]
        },
        // {
        //     key: 5,
        //     label: "Define your ideal roomate in words",
        //     inputCategory: "textarea",
        //     inputPlaceholder: "E.g  I’d love to have a neat roommate. I can not cope in a dirty environment."
        // },
    ]

    const button = <Button>Next <Img src={icon}/> </Button>
    const navClasses = 
    [
        createPersonalProfileStyles.visited,
        createPersonalProfileStyles.visited,
        createPersonalProfileStyles.active
    ];

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        console.log(e.target[2].value);
        console.log(e.target[3].value);
        console.log(e.target[4].value);

        // setIsFormSubmitted(true);
    }

    return ( 
        <>
            {/* Direct to tell us about yourself screen */}
            {isFormSubmitted && <Navigate replace to="/create-profile-thankyou"/>}

            <CreatePersonalProfileTemplate
                inputs = {inputs}
                button = {button}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
            />
        </>
       
     );
}
 
export default DefineIdealRoommate;