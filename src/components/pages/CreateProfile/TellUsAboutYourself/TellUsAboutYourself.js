import { useState } from 'react';
import Img from './../../../ui/atoms/Img/Img';
import { Link, Navigate } from 'react-router-dom';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import CreatePersonalProfileTemplate from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate'
import createPersonalProfileStyles from './../../../templates/CreatePersonalProfileTemplate/CreatePersonalProfileTemplate.module.css';
import { useEffect } from 'react';

const TellUsAboutYourself = () => 
{
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [consoleLog, setConsoleLog] = useState("Initial");


    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }

    useEffect(() => 
    {
        let openRequest = indexedDB.open("files");

        //if the database does not exist
        openRequest.onupgradeneeded = () => 
        {
            let db = openRequest.result;
            db.createObjectStore("files");
        }

        openRequest.onsuccess = () => 
        {
            let db = openRequest.result;
            let transaction = db.transaction("files", "readonly");
            let files = transaction.objectStore("files");
            let data = files.get("profile_picture");

            data.onsuccess = () => 
            {
                setProfileImage(data.result);
                console.log(data.result);
                //return data.result;
            }

            data.onerror = () => 
            {
                console.log("Error", data.error);
            }
        }
    }, []);

    // const getImageFromIndexDb = (name) => 
    // {
    //     let openRequest = indexedDB.open("files");

    //     //if the database does not exist
    //     openRequest.onupgradeneeded = () => 
    //     {
    //         let db = openRequest.result;
    //         db.createObjectStore("files");
    //     }

    //     openRequest.onsuccess = () => 
    //     {
    //         let db = openRequest.result;
    //         let transaction = db.transaction("files");
    //         let files = transaction.objectStore("files", "read");
    //         let data = files.get(name);

    //         data.onsuccess = () => 
    //         {
    //             console.log(data.result);
    //             return data.result;
    //         }

    //         data.onerror = () => 
    //         {
    //             console.log("Error", data.error);
    //         }
    //     }

    //     openRequest.onerror = () => 
    //     {
    //         console.log("Error", openRequest.error);
    //     }
    // }

    const handleFileInputChange = (name, value) => 
    {
        //save to IndexDB
        let openRequest = indexedDB.open("files");

        //If the client has no database yet
        openRequest.onupgradeneeded = () => 
        {
            let db = openRequest.result;
            db.createObjectStore('files'); //creating the "objectStore" (table) with name of "files"
        }

        //If the database opened successfully
        openRequest.onsuccess = () => 
        {
            let db = openRequest.result;
            let transaction = db.transaction("files", "readwrite");
            let files = transaction.objectStore("files");

            let request = files.put(value, name);

            request.onsuccess = () => 
            {
                console.log("Profile image temporarily stored");
            }

            request.onerror = () => 
            {
                console.log("Error", request.error);
            }
        }

        //If there is an error with opening database.
        openRequest.onerror = () => 
        {
            console.log("Error", openRequest.error);
        }
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();  
        setIsFormSubmitted(true);
    }


    const inputs = 
    [
        {
            inputName: "profile_picture",
            inputCategory: "inputFile",
            value: profileImage,
            required: true,
        },
        {
            label: "Religion",
            inputName: "religion",
            inputCategory: "select",
            value: localStorage.getItem("religion"),
            required: true,
            data:
            [
                {label: "Christian", value: "CHRISTIANITY"},
                {label: "Muslim", value: "ISLAM"},
                {label: "Other", value: "OTHER"}
            ]
        },
        {
            label: "Personality",
            inputName: "personality",
            inputCategory: "select",
            value: localStorage.getItem("personality"),
            required: true,
            data:                
            [
                {label: "Introvert", value: "INTROVERT"},
                {label: "Extrovert", value: "EXTROVERT"}
            ]
        },
        {
            label: "Profession",
            inputName: "profession",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "e.g student / web developer / real estate manager",
            value: localStorage.getItem("profession"),
            required: true
        },
        {
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
                handleFileInputChange = {handleFileInputChange}
            />
        </>
       
     );
}
 
export default TellUsAboutYourself;