import { useEffect, useState } from 'react';
import Img from './../../../ui/atoms/Img/Img';
import { Link, Navigate } from 'react-router-dom';
import { CREATE_PROFILE } from '../../../routes';
import usePost from '../../../../customHooks/usePost';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/check-icon.svg';
import CreatePersonalProfileTemplate from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';

const DefineIdealRoommate = () => 
{
    const [isLoading, setIsLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const TOKEN = localStorage.getItem("accessToken");
    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_PROFILE, TOKEN);

    const inputs = 
    [
        {
            key: 1,
            label: "I need a ________ roommate",
            inputName: "roomie_gender",
            inputCategory: "radioInput",
            value: localStorage.getItem("roomie_gender"),
            required: true,
            data:
            [
                {key: 1, label: "Male", value: "MALE"},
                {key: 2, label: "Female", value: "FEMALE"}
            ]
                    
        },
        {
            key: 2,
            label: "I would like my roommate to be a",
            inputName: "roomie_religion",
            inputCategory: "radioInput",
            value: localStorage.getItem("roomie_religion"),
            required: true,
            data:
            [
                {key: 1, label: "Christian", value: "CHRISTIANITY"},
                {key: 2, label: "Muslim", value: "ISLAM"},
                {key: 3, label: "I don't mind", value: "I don't mind"}
            ]
                    
        },
        {
            key: 3,
            label: "I would like my roommate to be an",
            inputName: "roomie_personality",
            inputCategory: "radioInput",
            value: localStorage.getItem("roomie_personality"),
            required: true,
            data:
            [
                {key: 1, label: "Introvert", value: "INTROVERT"},
                {key: 2, label: "Extrovert", value: "EXTROVERT"},
                {key: 3, label: "I don't mind", value: "I don't mind"}
            ]
                    
        },
        {
            key: 4,
            label: "My roommate should be of this age range",
            inputName: "roomie_age_range",
            inputCategory: "radioInput",
            value: localStorage.getItem("roomie_age_range"),
            required: true,
            data:
            [
                {key: 1, label: "< 16", value: "< 16"},
                {key: 2, label: "16 - 20", value: "16 - 20"},
                {key: 3, label: "21 - 25", value: "21 - 25"},
                {key: 4, label: "25 - 30", value: "25 - 30"},
                {key: 5, label: "> 30", value: "> 30"},
            ]
        },
        {
            key: 5,
            label: "Define your ideal roomate in words",
            inputCategory: "textarea",
            inputName: "roomie_description",
            inputPlaceholder: "E.g  I’d love to have a neat roommate. I can not cope in a dirty environment.",
            value: localStorage.getItem("roomie_description"),
            required: true
        }
    ]

    const nextButton = <Button><Img src={icon} customStyle={{margin: "0 6px 0 0"}}/> Done</Button>
    const previousButton = <Link to="/about-yourself"><Button>Previous</Button></Link>

    const navClasses = 
    [
        createPersonalProfileStyles.visited,
        createPersonalProfileStyles.visited,
        createPersonalProfileStyles.active
    ];

    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setIsLoading(true); //set state of loading button

        const credentials = 
        {
            "fullname": localStorage.getItem("fullname"),
            "religion": localStorage.getItem("religion").toUpperCase(),
            "gender": localStorage.getItem("gender"),
            "phone_number": localStorage.getItem("phone_number"),
            "personality": localStorage.getItem("personality").toUpperCase(),
            "profession": localStorage.getItem("profession"),
            "bio": localStorage.getItem("bio"),
            "age": 13,//localStorage.getItem("age"),
            "roomie_gender": localStorage.getItem("roomie_gender").toUpperCase(),
            "roomie_religion": localStorage.getItem("roomie_religion").toUpperCase(),
            "roomie_age": 14,//localStorage.getItem("roomie_age"),
            "roomie_personality": localStorage.getItem("roomie_personality").toUpperCase(),
            "roomate_description": localStorage.getItem("roomate_description"),
        }

        //create profile record on backend
        sendPostRequest(credentials);
    }

    useEffect(() => 
    {
        if(isError || isSuccess)
        {
            setIsLoading(false);
        }

        //clear local storage data on success
        if(isSuccess)
        {
            localStorage.removeItem("fullname");
            localStorage.removeItem("religion");
            localStorage.removeItem("gender");
            localStorage.removeItem("phone_number");
            localStorage.removeItem("personality");
            localStorage.removeItem("profession");
            localStorage.removeItem("bio");
            localStorage.removeItem("age");
            localStorage.removeItem("roomie_gender");
            localStorage.removeItem("roomie_religion");
            localStorage.removeItem("roomie_age");
            localStorage.removeItem("roomie_personality");
            localStorage.removeItem("roomate_description");

            //set form submitted to true
            setIsFormSubmitted(true);
        }

        console.log(APIdata);

    }, [isError, isSuccess, APIdata]);

    return ( 
        <>
            {/* Direct to tell us about yourself screen */}
            {isFormSubmitted && <Navigate replace to="/create-profile-thankyou"/>}

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
 
export default DefineIdealRoommate;