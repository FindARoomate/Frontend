import * as Yup from 'yup';
import Img from '../../ui/atoms/Img/Img';
import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Label from '../../ui/atoms/Label/Label';
import Input from '../../ui/atoms/Input/Input';
import Select from '../../ui/atoms/Select/Select';
import Button from '../../ui/atoms/Button/Button';
import usePost from '../../../customHooks/usePost';
import { CREATE_ROOMMATE_REQUEST } from '../../routes';
import styles from './CreateRoommateRequest.module.css';
import checkIcon from './../../../icons/check-icon.svg';
import Textarea from '../../ui/atoms/Textarea/Textarea';
import FileInput from '../../ui/atoms/FileInput/FileInput';
import nextIcon from './../../../icons/right-arrow-icon.svg';
import { Formik, useFormik, Field } from 'formik';
import ErrorAlert from '../../ui/molecules/Alerts/ErrorAlert/ErrorAlert';
import {createRoommateRequestInitialValues, createRoommateRequestValidation, validateForm} from './CreateRoommateRequestHelper';

const CreateRoommateRequest = () => 
{
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({});
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    myHeaders.append("Accept", "application/json");
    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_ROOMMATE_REQUEST, myHeaders);


    //Get country list from API
    const getCountries = async () => 
    {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "am9vVVAyRlBRY1B0VDl6anR2UGI0YXMyNDdwQXFDWmJmUHFraGN2RQ==");

        const res = await fetch("https://api.countrystatecity.in/v1/countries", 
        {   headers:  headers,
            method: "GET"
        });

        const body = await res.json();

        if(res.ok)
        {
            setCountries(body);

        }else
        {
            console.log(body);
        }
    }

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

        const {formStatus, message} = validateForm(4, formik.errors);
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
            formData.append("amenities", formik.values.amenities);
            formData.append("date_to_move", formik.values.date_to_move); 

             //append all images
             for (let i = 0; i < formik.values.request_images.length; i++)
             {
                 formData.append("request_images", formik.values.request_images[i]);
             }

            //create profile record on backend
            sendPostRequest(formData);

        }else
        {
            setIsLoading(false);
            setNextButtonClicked(true);
            setError(message);
        }
        
    }

    useEffect(() => 
    {
        if(isError) setError(APIdata.detail);
        if(isError || isSuccess) setIsLoading(false);

        if(countries.length <= 0) getCountries();
        
        if(selectedCountry) getStates();

        if(selectedState) getCities();

    }, [isError, isSuccess, APIdata, countries, selectedCountry, selectedState]);


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

                <div className={styles.inputGroup}>
                    <Label name="country">Country</Label>
                    <Select 
                        name="country" 
                        onChange={(e) => 
                        {
                            setSelectedCountry(e.target.options[e.target.selectedIndex].dataset.iso)
                            formik.setFieldValue("country", e.target.value)
                        }
                        }
                        onBlur={formik.handleBlur}
                    >
                    <option value="">Select a country</option>
                    {countries.map((country) => 
                    {
                        return <option key={country.id} data-iso={country.iso2}>{country.name}</option>

                    })}
                    </Select>
                  
                    {!nextButtonClicked && ((formik.touched.country && formik.errors.country) &&<ErrorAlert>{formik.errors.country}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.country && <ErrorAlert>{formik.errors.country}</ErrorAlert>)}
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
                    >
                    <option value="">Select a state</option>
                    {states.map((state) => 
                    {
                        return <option key={state.id} data-iso={state.iso2}>{state.name}</option>

                    })}
                    </Select>
                    {!nextButtonClicked && ((formik.touched.state && formik.errors.state) &&<ErrorAlert>{formik.errors.state}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.state && <ErrorAlert>{formik.errors.state}</ErrorAlert>)}
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
                    >
                    <option value="">Select a city</option>
                    {cities.map((city) => 
                    {
                        return <option key={city.id} data-iso={city.iso2}>{city.name}</option>

                    })}
                    </Select>
                    {!nextButtonClicked && ((formik.touched.city && formik.errors.city) &&<ErrorAlert>{formik.errors.city}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.city && <ErrorAlert>{formik.errors.city}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="street_address">Street Address</Label>
                    <Textarea 
                        name="street_address"
                        {...formik.getFieldProps('street_address')}
                        placeholder="E.g  I am a church girl and I love playing music out loud. 
                        Do not consider becoming my roommate if you hate loud music.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.street_address && formik.errors.street_address) &&<ErrorAlert>{formik.errors.street_address}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.street_address && <ErrorAlert>{formik.errors.street_address}</ErrorAlert>)}
                </div>

                <div className='ml-auto'>
                    <Button type="button" onClick={() => moveToNextFormGroup(1, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
               
            </div>

            <div className={`${styles.formGroup}`}>
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
                    {!nextButtonClicked && ((formik.touched.room_type && formik.errors.room_type) &&<ErrorAlert>{formik.errors.room_type}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.room_type && <ErrorAlert>{formik.errors.room_type}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_persons">No of persons to occupy the apartment</Label>
                    <Input  name="no_of_persons" placeholder="Please type in the total number of occupants in your room" type="text" {...formik.getFieldProps('no_of_persons')}/>
                    {!nextButtonClicked && ((formik.touched.no_of_persons && formik.errors.no_of_persons) &&<ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.no_of_persons && <ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_current_roomies">No of current roommates/flatmates</Label>
                    <Input  name="no_of_current_roomies" placeholder="Please type in the number of roommates you currently have" type="text" {...formik.getFieldProps('no_of_current_roomies')}/>
                    {!nextButtonClicked && ((formik.touched.no_of_current_roomies && formik.errors.no_of_current_roomies) &&<ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.no_of_current_roomies && <ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>)}
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
                    {!nextButtonClicked && ((formik.touched.amenities && formik.errors.amenities) &&<ErrorAlert>{formik.errors.amenities}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.amenities && <ErrorAlert>{formik.errors.amenities}</ErrorAlert>)}
                </div>

                <div>
                    <div className={styles.buttonGroup}>
                        <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(2)}>Previous</Button>
                        <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(2, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    </div>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
            </div>

            <div className={`${styles.formGroup}`}>
                <div className={styles.inputGroup}>
                    <Label name="date_to_move">How soon can your roommate move in?</Label>
                    <Input  name="date_to_move" type="date" placeholder="Select a date" {...formik.getFieldProps('date_to_move')}/>
                    {!nextButtonClicked && ((formik.touched.date_to_move && formik.errors.date_to_move) &&<ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.date_to_move && <ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="rent_per_person">Rent per person (in naira)?</Label>
                    <Input  name="rent_per_person" type="text" placeholder="Please enter the rent each person is to pay" {...formik.getFieldProps('rent_per_person')}/>
                    {!nextButtonClicked && ((formik.touched.rent_per_person && formik.errors.rent_per_person) &&<ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.rent_per_person && <ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_cost">Are there additional costs?</Label>
                    <Textarea 
                        name="additional_cost"
                        {...formik.getFieldProps('additional_cost')}
                        placeholder="E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.additional_cost && formik.errors.additional_cost) &&<ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.additional_cost && <ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>)}
                </div>

                <div>
                    <div className={styles.buttonGroup}>
                        <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(3)}>Previous</Button>
                        <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(3, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    </div>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
            </div>

            <div className={`${styles.formGroup}`}>
                <div className={styles.inputGroup}>
                    <Label>Please add at least four pictures of different parts of your room e.g bedroom, ktchen, bathroom, balcony, etc. </Label>
                    <FileInput
                        name="request_images"
                        multiple
                        onChange={(name, value) => {formik.setFieldValue(name, value)}}
                        onBlur={formik.handleBlur}
                    />
                    {!nextButtonClicked && ((formik.touched.request_images && formik.errors.request_images) &&<ErrorAlert>{formik.errors.request_images}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.request_images && <ErrorAlert>{formik.errors.request_images}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="listing_title">Add a suitable title for your room listing</Label>
                    <Input  name="listing_title" type="text" placeholder="E.g Bedroom flat in Bodija, Ibadan." {...formik.getFieldProps('listing_title')}/>
                    {!nextButtonClicked && ((formik.touched.listing_title && formik.errors.listing_title) &&<ErrorAlert>{formik.errors.listing_title}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.listing_title && <ErrorAlert>{formik.errors.listing_title}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_information">Are there additional information</Label>
                    <Textarea 
                        name="additional_information"
                        {...formik.getFieldProps('additional_information')}
                        placeholder="I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.additional_information && formik.errors.additional_information) &&<ErrorAlert>{formik.errors.additional_information}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.additional_information && <ErrorAlert>{formik.errors.additional_information}</ErrorAlert>)}
                </div>

                <div className={styles.buttonGroup}>
                    <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(4)}>Previous</Button>
                    <Button className={`${styles.submitButton} ${isLoading ? "isLoading": ""}`} type="submit" >
                        {isLoading ? "Loading..." : 
                        <>
                            <Img src={checkIcon} customStyle={{margin: "auto 6px auto 0"}}/> Done 
                        </>}
                    </Button>
                </div>
            </div>
            </form>
            )}
        </Formik>
        </div>
        </>
        
            
     );
}
 
export default CreateRoommateRequest;