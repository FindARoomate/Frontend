import CreateRoommateRequestTemplate from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate";
import style from "../../../templates/CreateRoommateRequestTemplate/CreateRoommateRequestTemplate.module.css";
import Button from "../../../ui/atoms/Button/Button";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePost from "../../../../customHooks/usePost";
import { CREATE_ROOMMATE_REQUEST } from "../../../routes";
import { saveToIDB, removeImageFromIDB} from "../../../../helperFunctions/indexDB";
import useGetFromIDB from "../../../../helperFunctions/useGetFromIDB";

const RoomLook = () => 
{

    const [isLoading, setIsLoading] = useState(false);
    const {IDBData: requestImages, getIDBData} = useGetFromIDB();

    const token = "Bearer " + localStorage.getItem("accessToken");
   
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    
    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_ROOMMATE_REQUEST, myHeaders);

    const convert_to_array = (data) => 
    {
        const data_array = data.split(",");
        const new_array = [];

        data_array.forEach((value) => 
        {
            if(value) new_array.push(value);

        });

        return new_array;
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault();     
        setIsLoading(true);

        if(requestImages)
        {
            const formData = new FormData();
            formData.append("country", localStorage.getItem("country"));
            formData.append("state", localStorage.getItem("state"));
            formData.append("city", localStorage.getItem("city"));
            formData.append("street_address", localStorage.getItem("street_address")); //gives issues if the street is a single word
            formData.append("room_type", localStorage.getItem("room_type"));
            formData.append("no_of_persons", localStorage.getItem("no_of_persons"));
            formData.append("no_of_current_roomies", localStorage.getItem("no_of_current_roomies"));
            formData.append("rent_per_person", localStorage.getItem("rent_per_person"));
            formData.append("additional_cost", localStorage.getItem("additional_cost"));
            formData.append("listing_title", localStorage.getItem("listing_title"));
            formData.append("roomate_description", localStorage.getItem("roomie_description"));
            formData.append("additional_information", localStorage.getItem("additional_information"));
            formData.append("amenities", convert_to_array(localStorage.getItem("amenities")));
            formData.append("date_to_move", localStorage.getItem("how_soon_roommate_can_move_in")); 

            //append all images
            for (let i = 0; i < requestImages.length; i++)
            {
                formData.append("request_images", requestImages[i]);
            }

            console.log("Button clicked");
            sendPostRequest(formData);
        }
       
        
    }

   
    useEffect(() => 
    {

        getIDBData("files", "files", "request_images");


        if(isSuccess)
        {
            setIsLoading(false);
            //delete information from localstorage
            localStorage.removeItem("country");
            localStorage.removeItem("state");
            localStorage.removeItem("city");
            localStorage.removeItem("street_address");
            localStorage.removeItem("room_type");
            localStorage.removeItem("no_of_persons");
            localStorage.removeItem("no_of_current_roomies");
            localStorage.removeItem("amenities");
            localStorage.removeItem("rent_per_person");
            localStorage.removeItem("additional_cost");
            localStorage.removeItem("listing_title");
            localStorage.removeItem("additional_information");
            removeImageFromIDB("files", "files", "request_images"); // delete roommate request images from IndexedDB
        }
        
        if(isError)
        {
            setIsLoading(false);
            console.log(APIdata);
        }

    }, [isSuccess, isError, APIdata])
       

    const handleInputChange = (name, value) => 
    {
        localStorage.setItem(name, value);
    }

    
    const handleFileInputChange = (name, value) => 
    {
       saveToIDB("files", "files", {name, value});
    }

    const inputs = 
    [
        {
            label: "Please add at least four pictures of different parts of your room e.g bedroom, kitchen, bathroom, balcony, etc. ",
            inputName: "request_images",
            inputCategory: "inputFile",
            required: true,
            value: requestImages
        },
        {
            label: "Add a suitable title for your room listing",
            inputName: "listing_title",
            inputCategory: "input",
            inputType: "text",
            inputPlaceholder: "E.g 5 bedroom flat in Bodija, Ibadan.",
            required: true,
            value: localStorage.getItem("listing_title")
        },
        {
            label: "Additional Information",
            inputCategory: "textarea",
            inputName: "additional_information",
            inputPlaceholder: `I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.`,
            required: true,
            value: localStorage.getItem("additional_information")
        },
    ];

    const prevButton = <Link to="/room-pricing"><Button>Previous</Button></Link>
    const nextButton = <Button>Publish Request</Button>
    const loadingButton = <Button>Loading...</Button>

    const navClasses = 
    [
        style.visited,
        style.visited,
        style.visited,
        style.active
    ];

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    return ( 
        <>
            {isSuccess && (<Navigate to="/create-roommate-request-thankyou"/>)}
            <CreateRoommateRequestTemplate
                inputs = {inputs}
                prevButton = {prevButton}
                nextButton = {isLoading ? loadingButton : nextButton}
                navClasses = {navClasses}
                handleSubmit = {handleSubmit}
                description = "What does your room look like?"
                handleInputChange={handleInputChange}
                handleFileInputChange = {handleFileInputChange}
            />
        </>
        
     );
}
 
export default RoomLook;