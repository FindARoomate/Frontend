import {updateRoommateRequestInitialValues, updateRoommateRequestValidation} from './UpdateRoommateRequestHelper';
import EditRommateRequestImages from "../../ui/organisms/EditRommateRequestImages/EditRommateRequestImages";
import { UPDATE_ROOMMATE_REQUEST_END, UPDATE_ROOMMATE_REQUEST_START, ADD_IMAGES_TO_ROOMMATE_REQUEST} from "../../routes";
import ErrorAlert from '../../ui/molecules/Alerts/ErrorAlert/ErrorAlert';
import addMoreFilesIcon from './../../../icons/add-more-files-icon.svg';
import FileInput from "../../ui/atoms/FileInput/FileInput";
import Textarea from '../../ui/atoms/Textarea/Textarea';
import usePatch from "../../../customHooks/usePatch";
import Button from '../../ui/atoms/Button/Button';
import { Formik, useFormik, Field } from 'formik';
import Select from '../../ui/atoms/Select/Select';
import Label from "../../ui/atoms/Label/Label";
import Input from '../../ui/atoms/Input/Input';
import H3 from '../../ui/atoms/Headings/H3/H3';
import H1 from '../../ui/atoms/Headings/H1/H1';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useAddImagesToRoommateRequestData } from '../../../customHooks/useRoommateRequestData';
import { ACCESS_TOKEN } from '../../settings';

const EditSingleRequestForm = ({styles, APIData, isCurrentlyEditting, setIsCurrentlyEditting}) => 
{
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedState, setSelectedState] = useState({});// set this
    const [selectedCountry, setSelectedCountry] = useState("NG");

    const [editRequestImages, setEditRequestImages] = useState([]);
    const [imagesToBeDeleted, setImagesToBeDeleted] = useState([]);

    const [roommateRequestInitialValues, setRoommateRequestInitialValues] = useState({});

    const [errorMessage, setErrorMessage] = useState(null);

    // Activate or deactivate request
    const updateToken = "Bearer " + localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", updateToken);
    const {isSuccess: updateRoommateRequestSuccess, isError: updateRoommateRequestError, APIData: updateRoommateRequestData, sendPatchRequest: sendUpdateRooomatePatchRequest} = usePatch(myHeaders);

    //For adding request images data
    const { isLoading: addRequestImageIsLoading, error:  addRequestImageError, data:  addRequestImageData, mutate: addRequestImageMutate } = useAddImagesToRoommateRequestData();
    if (addRequestImageIsLoading) console.log("Loading...");
    if (addRequestImageError) console.log(addRequestImageError);
    if(addRequestImageData) console.log(addRequestImageData);

    const validateFileUpload = (oldImageLength = 0, files, formik) => 
    {

        //set formik values
        formik.values.request_images = files;
        formik.touched.request_images = true;
        let oldImageLen = oldImageLength > 0 ? oldImageLength : editRequestImages.length;
        let newImageLen = files.length;
        let totalLen = oldImageLen + newImageLen;

        if(totalLen > 8)
        {
            formik.errors.request_images = 'Please select a maximum of 8 images';
        }

        if(totalLen < 4)
        {
            formik.errors.request_images = 'Please select at least 4 images';
        }

        if((totalLen > 3) && (totalLen < 9))
        {
            delete(formik.errors.request_images);
        }
    }

    const removeImage = (id, formik) => 
    {
        let oldEditRequestImages = editRequestImages;
        let newEditImages = oldEditRequestImages.filter((image) => 
        {
            if(image.id != id) return image;
        })

        setEditRequestImages(newEditImages);
        setImagesToBeDeleted((oldImages) => ([...oldImages, id]));
        validateFileUpload(oldEditRequestImages.length - 1, [], formik); //ensure we don't have below 4 images
    }

  //Get country list from API
    // const getCountries = async () => 
    // {
    //     var headers = new Headers();
    //     headers.append("X-CSCAPI-KEY", "am9vVVAyRlBRY1B0VDl6anR2UGI0YXMyNDdwQXFDWmJmUHFraGN2RQ==");

    //     const res = await fetch("https://api.countrystatecity.in/v1/countries", 
    //     {   headers:  headers,
    //         method: "GET"
    //     });

    //     const body = await res.json();

    //     if(res.ok)
    //     {
    //         setCountries(body);

    //     }else
    //     {
    //         console.log(body);
    //     }
    // }

    //Get state list from API (based on country ISO2)
    const getStates = async () => 
    {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "am9vVVAyRlBRY1B0VDl6anR2UGI0YXMyNDdwQXFDWmJmUHFraGN2RQ==");

        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, 
        {   headers:  headers,
            method: "GET"
        });

        const body = await res.json();

        if(res.ok)
        {
            setStates(body);
        }else
        {
            console.log(body);
        }
    }

    //Get state list from API (based on country ISO2)
    const getCities = async () => 
    {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "am9vVVAyRlBRY1B0VDl6anR2UGI0YXMyNDdwQXFDWmJmUHFraGN2RQ==");

        const res = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, 
        {   headers:  headers,
            method: "GET"
        });

        const body = await res.json();

        if(res.ok)
        {
            setCities(body);
        }else
        {
            console.log(body);
        }
    }

    // const temporaryFormImagePost = async (formData) =>
    // {
    //     console.log("Sending");
    //     console.log(formData);

    //     const options = 
    //     {
    //         method: "POST",
    //         body: formData,
    //         headers: 
    //         {
    //             "Accept" : "application/json",
    //             "Authorization": ACCESS_TOKEN
    //         } 
    //     }

    //     const res = await fetch(ADD_IMAGES_TO_ROOMMATE_REQUEST, options);

    //     console.log(await res.json());

    // }
    const updateRoommateRequest = (e, formik) => 
    {
        e.preventDefault();
        // setIsLoading(true);

        // A temporary fix for the image error
        let oldImageLen = editRequestImages.length;
        let newImageLen = formik.values.request_images.length;
        let totalLen = oldImageLen + newImageLen;
        if((totalLen > 3) && (totalLen < 9))
        {
            delete(formik.errors.request_images);
        }

        if(false)//Object.values(formik.errors).length > 0)
        {
            console.log(formik.errors);
            setIsLoading(false);
            setErrorMessage("Kindly attend to error messages");
        }else 
        {
            const formData = new FormData();
            {formik.touched.country && formData.append("country", document.querySelector("select[name='country']").value);}
            {formik.touched.state && formData.append("state", document.querySelector("select[name='state']").value);}
            {formik.touched.city && formData.append("city", document.querySelector("select[name='city']").value);}
            {formik.touched.street_address && formData.append("street_address", document.querySelector("textarea[name='street_address']").value);} //gives issues if the street is a single word
            {formik.touched.room_type && formData.append("room_type", document.querySelector("select[name='room_type']").value);}
            {formik.touched.no_of_persons && formData.append("no_of_persons", document.querySelector("input[name='no_of_persons']").value);}
            {formik.touched.no_of_current_roomies && formData.append("no_of_current_roomies", document.querySelector("input[name='no_of_current_roomies']").value);}
            {formik.touched.rent_per_person && formData.append("rent_per_person", document.querySelector("input[name='rent_per_person']").value);}
            {formik.touched.additional_cost && formData.append("additional_cost", document.querySelector("textarea[name='additional_cost']").value);}
            {formik.touched.listing_title && formData.append("listing_title", document.querySelector("input[name='listing_title']").value);}
            {formik.touched.additional_information && formData.append("additional_information", document.querySelector("textarea[name='additional_information']").value);}
            {formik.touched.amenities && formData.append("amenities", document.querySelector("input[name='amenities']").value);}
            {formik.touched.date_to_move && formData.append("date_to_move", document.querySelector("input[name='date_to_move']").value);} 

            let updateRoommateRequestUrl = UPDATE_ROOMMATE_REQUEST_START + id + UPDATE_ROOMMATE_REQUEST_END;
            // sendUpdateRooomatePatchRequest(updateRoommateRequestUrl, formData);

            // add new images
            if(Object.values(formik.values.request_images).length > 0)
            {
                console.log("Adding images");
                let requestImages = Object.values(formik.values.request_images);

                requestImages.forEach((image) => 
                {       
                    // console.log(requestImages[0])
                    const formData = new FormData();
                    formData.append("image_file", image);
                    formData.append("request_id", APIData.id)
                    addRequestImageMutate(formData);
                });

                //temporaryFormImagePost(formData);
            }
            //delete images
        }

       
    }

    useState(() => 
    {      
        console.log(APIData);
        console.log(updateRoommateRequestSuccess);

        // if(imagesToBeDeleted.length > 0)
        // {
        // }
        
        if(selectedCountry) getStates();

        if(selectedState) getCities();

        if(updateRoommateRequestSuccess || updateRoommateRequestError)
        {
            setIsCurrentlyEditting(false);
            setIsLoading(false);
        }

        if(APIData)
        {
            //set default selected state to be the previous default selected state
            if(states && (Object.values(selectedState)).length <=0 )
            {
                states.map((state) => 
                {
                    if(state.name == APIData.state) setSelectedState(state.iso2); 
                })
            }            
        }  

        if(updateRoommateRequestSuccess)
        {
            setIsLoading(false);
            window.location.reload();
        }

        if((Object.values(roommateRequestInitialValues)).length <= 0)
        {
            setRoommateRequestInitialValues
            ({
                country: APIData.country,
                state: APIData.state,
                city: APIData.city,
                street_address: APIData.street_address,
                room_type: APIData.room_type,
                no_of_persons: APIData.no_of_persons,
                no_of_current_roomies: APIData.no_of_current_roomies, 
                date_to_move: APIData.date_to_move, 
                rent_per_person: APIData.rent_per_person, 
                additional_cost: APIData.additional_cost, 
                request_images: [], 
                listing_title: APIData.listing_title,
                amenities: APIData.amenities,
                additional_information: APIData.additional_information,
            });

            setEditRequestImages(APIData.request_images);
        }

    }, [
        updateRoommateRequestData,
        updateRoommateRequestError, 
        updateRoommateRequestSuccess,
        editRequestImages,
        imagesToBeDeleted,
        roommateRequestInitialValues,
    ]);

    return ( 
    <>
        <Formik
            initialValues = {roommateRequestInitialValues}
            validationSchema = {updateRoommateRequestValidation}
            onSubmit={(e) => updateRoommateRequest(e)}  
            >
    
    {formik => (
        <form className={styles.formGroupForm}>
            <div className={styles.inputForm}>

            <H1>Edit Roommate Request</H1>

            <div className={styles.inputCategory}>
                <H3>Where is your room located?</H3>
                <div className={styles.inputGroup}>
                    <Label name="country">Country</Label>
                    <Select name="country" {...formik.getFieldProps('country')}>
                        <option data-iso="NG">Nigeria</option>
                    </Select>
                    {formik.errors.country &&<ErrorAlert>{formik.errors.country}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="state">State</Label>
                    <Select 
                        name="state" 
                        onChange={(e) => 
                        {
                            setSelectedState(e.target.options[e.target.selectedIndex].dataset.iso)
                            formik.setFieldValue("state", e.target.value)
                        }
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.state}
                    >
                        {states.map((state) => 
                        {
                            return <option key={state.id} data-iso={state.iso2}>{state.name}</option>

                        })}
                    </Select>
                    {formik.errors.state &&<ErrorAlert>{formik.errors.state}</ErrorAlert>}
                </div>
                
                <div className={styles.inputGroup}>
                    <Label name="city">City</Label>
                    <Select 
                        name="city" 
                        onChange={(e) => 
                        {
                            setSelectedCity(e.target.options[e.target.selectedIndex].dataset.iso)
                            formik.setFieldValue("city", e.target.value)
                        }
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    >
                        {cities.map((city) => 
                        {
                            return <option key={city.id} data-iso={city.iso2}>{city.name}</option>

                        })}
                    </Select>
                    {formik.errors.city &&<ErrorAlert>{formik.errors.city}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="street_address">Street Address</Label>
                    <Textarea 
                        name="street_address"
                        {...formik.getFieldProps('street_address')}
                        placeholder="E.g  I am a church girl and I love playing music out loud. 
                        Do not consider becoming my roommate if you hate loud music.">
                    </Textarea>
                    {formik.errors.street_address && <ErrorAlert>{formik.errors.street_address}</ErrorAlert>}
                </div>
            </div>

            <div className={styles.inputCategoryDivider}></div>

            <div className={styles.inputCategory}>
                <H3>Let's know the details of the room</H3>
                <div className={styles.inputGroup}>
                    <Label name="room_type">Room Type</Label>
                    <Select name="room_type" {...formik.getFieldProps('room_type')}>
                        <option value="">Select a Room Type</option>
                        <option>Self Contain</option>
                        <option>2 Bedroom Flat</option>
                        <option>3 Bedroom Flat</option>
                        <option>Shortlet</option>
                        <option>Single Room Apartment</option>
                    </Select>
                    {formik.errors.room_type &&<ErrorAlert>{formik.errors.room_type}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_persons">No of persons to occupy the apartment</Label>
                    <Input  name="no_of_persons" placeholder="Please type in the total number of occupants in your room" type="text" {...formik.getFieldProps('no_of_persons')}/>
                    {formik.errors.no_of_persons &&<ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_current_roomies">No of current roommates/flatmates</Label>
                    <Input  name="no_of_current_roomies" placeholder="Please type in the number of roommates you currently have" type="text" {...formik.getFieldProps('no_of_current_roomies')}/>
                    {formik.errors.no_of_current_roomies &&<ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_current_roomies"><b>Amenities:</b> Kindly select all that applies</Label>
                    <div className={styles.checkboxContainer}>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Personal bathroom"/>
                            <Label>Personal bathroom</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Washing Machine"/>
                            <Label>Washing Machine</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Wifi"/>
                            <Label>Wifi</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Solar Inverter"/>
                            <Label>Solar Inverter</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Balcony"/>
                            <Label>Balcony</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Cooker"/>
                            <Label>Cooker</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value={"Reading table & chair"}/>
                            <Label>{"Reading table & chair"}</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Basketball court"/>
                            <Label>Basketball court</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Refrigirator"/>
                            <Label>Refrigirator</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Air Condition"/>
                            <Label>Air Condition</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Home theatre"/>
                            <Label>Home theatre</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Gym"/>
                            <Label>Gym</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Other"/>
                            <Label>Other</Label>
                        </span>
                    </div>
                    {formik.errors.amenities &&<ErrorAlert>{formik.errors.amenities}</ErrorAlert>}
                </div>
            </div>
            
            <div className={styles.inputCategoryDivider}></div>

            <div className={styles.inputCategory}>
                <H3>Move-in date and pricing</H3>
                <div className={styles.inputGroup}>
                    <Label name="date_to_move">How soon can your roommate move in?</Label>
                    <Input  name="date_to_move" type="date" placeholder="Select a date" {...formik.getFieldProps('date_to_move')}/>
                    {formik.errors.date_to_move &&<ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="rent_per_person">Rent per person (in naira)?</Label>
                    <Input  name="rent_per_person" type="text" placeholder="Please enter the rent each person is to pay" {...formik.getFieldProps('rent_per_person')}/>
                    {formik.errors.rent_per_person && <ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_cost">Are there additional costs?</Label>
                    <Textarea 
                        name="additional_cost"
                        {...formik.getFieldProps('additional_cost')}
                        placeholder="E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour.">
                    </Textarea>
                    {formik.errors.additional_cost &&<ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>}
                </div>
            </div>
            
            <div className={styles.inputCategoryDivider}></div>

            <div className={styles.inputCategory}>
                <H3>What does your room look like?</H3>
                <div className={styles.inputGroup}>                                
                    <div className={styles.editRequestImagesContainer}>
                        {APIData && <EditRommateRequestImages images={editRequestImages} removeImage={(id) => removeImage(id, formik)}/>}
                        <FileInput
                            name="request_images"
                            required={false}
                            multiple
                            fileLabel="Add more"
                            iconImg = {addMoreFilesIcon}
                            onChange={(name, value) => validateFileUpload(0, value, formik)}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    
                    {formik.errors.request_images && <ErrorAlert>{formik.errors.request_images}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="listing_title">Add a suitable title for your room listing</Label>
                    <Input  name="listing_title" type="text" placeholder="E.g Bedroom flat in Bodija, Ibadan." {...formik.getFieldProps('listing_title')}/>
                    {formik.errors.listing_title && <ErrorAlert>{formik.errors.listing_title}</ErrorAlert>}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_information">Are there additional information</Label>
                    <Textarea 
                        name="additional_information"
                        {...formik.getFieldProps('additional_information')}
                        placeholder="I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.">
                    </Textarea>
                    {formik.errors.additional_information && <ErrorAlert>{formik.errors.additional_information}</ErrorAlert>}
                </div>
            </div>
            
            <Button className={isLoading ? "isLoading" : ""} type="button" onClick={(e) => updateRoommateRequest(e, formik)}>{isLoading ? "Loading..." : "Save changes"} </Button>
        
        </div>
        </form>

        )}
    </Formik>
    {updateRoommateRequestSuccess && <div className={styles.successMessage}>Request updated successfully</div>}
    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </>
     );
}
 
export default EditSingleRequestForm;