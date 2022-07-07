import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import H1 from '../../ui/atoms/Headings/H1/H1';
import usePost from '../../../customHooks/usePost';
import { CREATE_ROOMMATE_REQUEST } from '../../routes';
import styles from './CreateRoommateRequest.module.css';
import RoomLook from '../../ui/organisms/CreateRoommateRequestPages/RoomLook';
import RoomDetails from '../../ui/organisms/CreateRoommateRequestPages/RoomDetails';
import RoomPricing from '../../ui/organisms/CreateRoommateRequestPages/RoomPricing';
import RoomLocation from '../../ui/organisms/CreateRoommateRequestPages/RoomLocation';
import {createRoommateRequestInitialValues, createRoommateRequestValidation, validateForm} from './CreateRoommateRequestHelper';
import { useCreateRoommateRequestData } from '../../../customHooks/useRoommateRequestData';

const CreateRoommateRequest = () => 
{
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Accept", "application/json");
    // const { isError, isSuccess, APIdata, sendPostRequest } = usePost(CREATE_ROOMMATE_REQUEST, myHeaders);
    const { error: APIerror, isSuccess, isError, data: APIdata, mutate } = useCreateRoommateRequestData();

    
    const moveToNextFormGroup = (current_index, errors) => 
    {        
        const {formStatus, message} = validateForm(current_index, errors);

        if(formStatus)
        {
            setError("");//clear error message
            setNextButtonClicked(false);

            const formGroups = document.querySelectorAll(`.${styles.formGroup}`);
            const progressBars = document.querySelectorAll(`.${styles.progressBar}`);

            formGroups[current_index-1].classList.remove(styles.formGroupActive); //remove active class from current form group
            formGroups[current_index].classList.add(styles.formGroupActive); //add active class to next form group
            
            progressBars[current_index-1].classList.remove(styles.progressBarActive); //remove active class from current progress step
            progressBars[current_index-1].classList.add(styles.progressBarVisited); //add visited class to current progress step
            progressBars[current_index].classList.add(styles.progressBarActive); //add active class to next progress step
            
        }else
        {
            setNextButtonClicked(true);
            setError(message);
        }
        
    }

    const moveToPreviousFormGroup = (current_index) => 
    {
        const formGroups = document.querySelectorAll(`.${styles.formGroup}`);
        const progressBars = document.querySelectorAll(`.${styles.progressBar}`);

        formGroups[current_index-1].classList.remove(styles.formGroupActive);//remove active class from current form group
        formGroups[current_index-2].classList.add(styles.formGroupActive);//add active class to previous form group
        
        progressBars[current_index-1].classList.remove(styles.progressBarActive);//remove active class from current progress step
        progressBars[current_index-2].classList.remove(styles.progressBarVisited);//remove visited class from previous progress step
        progressBars[current_index-2].classList.add(styles.progressBarActive);//add active class to previous progress step
    }

    
    const handleCreateProfile = (e, formik) => 
    {
        e.preventDefault();

        const { formStatus, message } = validateForm(4, formik.errors);
        setIsLoading(true);
        
        if(formStatus)
        {
            const formData = new FormData();
            formData.append("country", formik.values.country);
            formData.append("state", formik.values.state);
            formData.append("city", formik.values.city);
            formData.append("street_address", formik.values.street_address); //gives issues if the street is a single word
            formData.append("room_type", formik.values.room_type);
            formData.append("no_of_persons", formik.values.no_of_persons);
            formData.append("no_of_current_roomies", formik.values.no_of_current_roomies);
            formData.append("rent_per_person", formik.values.rent_per_person);
            formData.append("additional_cost", formik.values.additional_cost);
            formData.append("listing_title", formik.values.listing_title);
            formData.append("additional_information", formik.values.additional_information);
            formData.append("date_to_move", formik.values.date_to_move); 
            //append all amenities
            for (let i = 0; i < formik.values.amenities.length; i++)
            {
                formData.append("amenities", formik.values.amenities[i]);
            }

            // let newImageArray = [];
             //append all request images
             for (let i = 0; i < formik.values.request_images.length; i++)
             {
                 formData.append("request_images", formik.values.request_images[i]);
                //  newImageArray.push(formik.values.request_images[i])
             }

            //  console.log(newImageArray);
             console.log(formik.values.request_images);
            //create profile record on backend
            mutate(formData);

        }else
        {
            setIsLoading(false);
            setNextButtonClicked(true);
            setError(message);
        }
        
    }

    useEffect(() => 
    {
        if(isError) console.log(APIerror);//setError(APIdata.detail);
        if(isError || isSuccess) setIsLoading(false);

    }, [isError, isSuccess, APIdata]);


    return (   
        <>

        {isSuccess && <Navigate to="/create-roommate-request-thankyou"/>}

        <div className={styles.createRoommateRequest}>
        <H1>TELL US ABOUT YOUR ROOM</H1>

        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
            <div className={`${styles.progressBar} ${styles.progressBarActive}`}></div>
            <div className={`${styles.progressBar}`}></div>
            <div className={`${styles.progressBar}`}></div>
            <div className={`${styles.progressBar}`}></div>
        </div>


        <Formik
            initialValues = {createRoommateRequestInitialValues}
            validationSchema = {createRoommateRequestValidation}
            onSubmit = {handleCreateProfile}
        >
        
        {formik => (
        
            <form className={styles.formGroupForm} onSubmit={(e) => handleCreateProfile(e, formik)} >
            <div className={`${styles.formGroup} ${styles.formGroupActive}`}>

               <RoomLocation
                    formik={formik}
                    error = {error}
                    styles={styles}
                    nextButtonClicked={nextButtonClicked}
                    moveToNextFormGroup={moveToNextFormGroup}
               />
               
            </div>

            <div className={`${styles.formGroup}`}>
               <RoomDetails
                    formik={formik}
                    error = {error}
                    styles={styles}
                    nextButtonClicked={nextButtonClicked}
                    moveToNextFormGroup={moveToNextFormGroup}
                    moveToPreviousFormGroup={moveToPreviousFormGroup}
               />
            </div>

            <div className={`${styles.formGroup}`}>
                <RoomPricing
                    formik={formik}
                    error = {error}
                    styles={styles}
                    nextButtonClicked={nextButtonClicked}
                    moveToNextFormGroup={moveToNextFormGroup}
                    moveToPreviousFormGroup={moveToPreviousFormGroup}
                 />
            </div>

            <div className={`${styles.formGroup}`}>
               <RoomLook
                    formik={formik}
                    styles={styles}
                    nextButtonClicked={nextButtonClicked}
                    moveToPreviousFormGroup={moveToPreviousFormGroup}
                    isLoading = {isLoading}
               />
            </div>
            </form>
            )}
        </Formik>
        </div>
        </>
        
            
     );
}
 
export default CreateRoommateRequest;