import { ACTIVATE_ROOMMATE_REQUEST, DEACTIVATE_ROOMMATE_REQUEST, UPDATE_ROOMMATE_REQUEST_END, UPDATE_ROOMMATE_REQUEST_START } from "../../routes";
import SingleConnectionReceivedTemplate from '../../templates/SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import {updateRoommateRequestInitialValues, updateRoommateRequestValidation} from './UpdateRoommateRequestHelper';
import ErrorAlert from '../../ui/molecules/Alerts/ErrorAlert/ErrorAlert'
import { GET_SINGLE_ROOMMATE_REQUEST } from "../../routes";
import tickSquare from './../../../icons/tick-square.svg';
import alertIcon from './../../../icons/alert-icon.svg';
import Textarea from '../../ui/atoms/Textarea/Textarea';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import "./../../ui/organisms/Card/sliderStyles.css"; //slider styles
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import Button from '../../ui/atoms/Button/Button';
import { Formik, useFormik, Field } from 'formik';
import Select from '../../ui/atoms/Select/Select';
import useGet from "../../../customHooks/useGet";
import {Link, useParams} from 'react-router-dom';
import styles from './SingleRequest.module.css';
import { Navigation, Pagination } from "swiper";
import Input from '../../ui/atoms/Input/Input';
import H3 from '../../ui/atoms/Headings/H3/H3';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Lightbox from 'react-image-lightbox';
import Img from '../../ui/atoms/Img/Img';
import { v4 as uuidv4 } from 'uuid';
import P from '../../ui/atoms/P/P';
import { useEffect } from 'react';
import { useState } from 'react';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Label from "../../ui/atoms/Label/Label";
import FileInput from "../../ui/atoms/FileInput/FileInput";



const SingleRequest = () => 
{
    // Get request
    const {id} = useParams();
    const token = localStorage.getItem("accessToken");
    const url = GET_SINGLE_ROOMMATE_REQUEST + id + '/'; 
    const {isSuccess, APIData} = useGet(url, token);

    const [isLoading, setIsLoading] = useState(false);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({});
    
    
    const [isCurrentlyEditting, setIsCurrentlyEditting] = useState(false);

    // Activate or deactivate request
    const updateToken = "Bearer " + token;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", updateToken);
    const {isSuccess: updateSuccess, isError: updateError, APIData: updateData, sendPatchRequest} = usePatch(myHeaders);
    const {isSuccess: updateRoommateRequestSuccess, isError: updateRoommateRequestError, APIData: updateRoommateRequestData, sendPatchRequest: sendUpdateRooomatePatchRequest} = usePatch(myHeaders);
    const [roommateRequestInitialValues, setRoommateRequestInitialValues] = useState({});


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


    const updateRoommateRequest = (e) => 
    {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("country", document.querySelector("select[name='country']").value);
        formData.append("state", document.querySelector("select[name='state']").value);
        formData.append("city", document.querySelector("select[name='city']").value);
        formData.append("street_address", document.querySelector("textarea[name='street_address']").value); //gives issues if the street is a single word
        formData.append("room_type", document.querySelector("select[name='room_type']").value);
        formData.append("no_of_persons", document.querySelector("input[name='no_of_persons']").value);
        formData.append("no_of_current_roomies", document.querySelector("input[name='no_of_current_roomies']").value);
        formData.append("rent_per_person", document.querySelector("input[name='rent_per_person']").value);
        formData.append("additional_cost", document.querySelector("textarea[name='additional_cost']").value);
        formData.append("listing_title", document.querySelector("input[name='listing_title']").value);
        formData.append("additional_information", document.querySelector("textarea[name='additional_information']").value);
        formData.append("amenities", document.querySelector("input[name='amenities']").value);
        formData.append("date_to_move", document.querySelector("input[name='date_to_move']").value); 


        let updateRoommateRequestUrl = UPDATE_ROOMMATE_REQUEST_START + id + UPDATE_ROOMMATE_REQUEST_END;
        sendUpdateRooomatePatchRequest(updateRoommateRequestUrl, formData);
        // console.log("Update");
    }

    const handleBack = () => 
    {
        return !isCurrentlyEditting ? window.history.back() : setIsCurrentlyEditting(false);
    }

    const handleOnClick = () => 
    {
        setIsLoading(true);

        //deactivate request
        if(APIData && APIData.is_active)
        {
            const url = DEACTIVATE_ROOMMATE_REQUEST + id + '/'; 

            const formData = new FormData();
            formData.append("is_active", false);

            sendPatchRequest(url, formData);
        }

        //activate request
        if(APIData && !APIData.is_active)
        {
            const url = ACTIVATE_ROOMMATE_REQUEST + id + '/'; 

            const formData = new FormData();
            formData.append("is_active", true);

            sendPatchRequest(url, formData);
        }
    }

    useEffect (() => 
    {
        if(updateSuccess || updateError)
        {
            setIsLoading(false);
            console.log(updateData);
        }

        if(updateRoommateRequestSuccess || updateRoommateRequestError)
        {
            setIsCurrentlyEditting(false);
            setIsLoading(false);
            console.log(updateRoommateRequestData);
        }

        if(updateRoommateRequestSuccess)
        {
            window.location.reload();
        }

        if(isSuccess && APIData)
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
                    request_images: '',//APIData.request_images, 
                    listing_title: APIData.listing_title,
                    amenities: APIData.amenities,
                    additional_information: APIData.additional_information,
            });
            console.log("initial values",roommateRequestInitialValues);
        }

        if(countries.length <= 0) getCountries();
        
        if(selectedCountry) getStates();

        if(selectedState) getCities();

    }, [
            isSuccess,
            APIData,
            updateData,
            updateError, 
            updateSuccess, 
            updateRoommateRequestData,
            updateRoommateRequestError, 
            updateRoommateRequestSuccess,
            countries, selectedCountry, selectedState
        ]);

    const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    
    const requestImages = APIData && APIData.request_images;

    const openLightBox = (index) => 
    {
        setIsLightBoxOpen(true);//open lightbox
        setPhotoIndex(index);
    }

    return ( 
            <SingleConnectionReceivedTemplate>
                <div className={styles.backNavigation} onClick={handleBack}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>

                {!isCurrentlyEditting &&
                <>
                <div className={styles.topBar}>
                        <div className={styles.statistics}>
                            <div className={styles.singleStatistic}>
                                <Img src={tickSquare}/>
                                <P>1 connection accepted</P>
                            </div>
                            <div className={styles.singleStatistic}>
                                <Img src={alertIcon}/>
                                <P>2 connections pending</P>
                            </div>
                        </div>
                    <div className={styles.editIcon}>
                        <Button handleOnClick={() => setIsCurrentlyEditting(true)}><Img src={editIcon}/><span>Edit</span></Button>
                        
                    </div>
                </div>

                <div className={styles.requestInfo}>
                <div className={styles.imageContainer}>
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {APIData && requestImages.map((imageLink, index) => 
                    {
                        return (
                        <SwiperSlide key={uuidv4()}>
                            <Img 
                                src={imageLink.image_url}
                                onClick = {() => openLightBox(index)}
                            />
                        </SwiperSlide>
                        )
                        
                    })
                    }
                   
                </Swiper>
                {isLightBoxOpen && (
                    <Lightbox
                        mainSrc={requestImages[photoIndex].image_url}
                        nextSrc={requestImages[(photoIndex + 1) % requestImages.length].image_url}
                        prevSrc={requestImages[(photoIndex + requestImages.length - 1) % requestImages.length].image_url}
                        onCloseRequest={() => setIsLightBoxOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex) => 
                            {
                                return (photoIndex + requestImages.length - 1) % requestImages.length;

                            })
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex) => 
                            {
                                return (photoIndex + 1) % requestImages.length;
                            })
                        }
                    />
                    )
                    }
                </div>


                        <div className={styles.roomInfoContainer}>
                            <div className={styles.roomInfoRow}>
                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>Room Type</span>
                                     <span className={styles.value}>{APIData ? APIData.room_type : "Loading..."}</span>
                                </div>

                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>Rent</span>
                                     <span className={styles.value}>{APIData ? "₦ " + APIData.rent_per_person + "/Year": "Loading..."}</span>
                                </div>
                            </div>

                            <div className={styles.roomInfoRow}>
                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>Other bills</span>
                                     <span className={styles.value}>{APIData ? APIData.additional_cost : "Loading..."}</span>
                                </div>

                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>Availability</span>
                                     <span className={styles.value}>{APIData ? APIData.date_to_move : "Loading..."}</span>
                                </div>
                            </div>

                            <div className={styles.roomInfoRow}>
                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>No of person to occupy the room</span>
                                     <span className={styles.value}>{APIData ? APIData.no_of_persons : "Loading..."}</span>
                                </div>
                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>No of current roommates</span>
                                      <span className={styles.value}>{APIData ? APIData.no_of_current_roomies : "Loading..."}</span>
                                </div>
                            </div>
            

                            <div>
                                <div className={styles.roomInfo}>
                                    <span className={styles.label}>Location</span>
                                    <span className={styles.value}>
                                    {(APIData ? APIData.street_address +  ", " + APIData.city + ", " + APIData.state + ", " + APIData.country : "Loading...")}
                                    </span>
                                </div>
                            </div>
                        </div> 
                        
                        <div className={styles.buttonGroup}>
                         
                            <div className={styles.viewRequest}>
                                <Link to={APIData ? `/roommate-request/${APIData.id}` : '/'}>
                                    View Request Page
                                </Link>
                            </div>
                            {APIData  && (APIData.is_active ? 
                                    <div className={styles.rejectButton}>
                                        <Button  type="button" handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                            {isLoading ? "Loading..." : "Deactivate Request"}
                                        </Button>
                                    </div>
                                    :
                                    <div className={styles.acceptButton}>
                                        <Button type="button" handleOnClick={handleOnClick} className={isLoading ? "isLoading" : ""}>
                                            {isLoading ? "Loading..." : "Activate Request"}
                                        </Button>
                                        
                                    </div>
                                )
                            }
                            
                        </div>
                            {updateSuccess && <div className={styles.successMessage}>{updateData.detail}</div>}
                            {updateError && <div className={styles.errorMessage}>Something bad happened. Please try again</div>}
                        </div>
                        </>
                        }

            {isCurrentlyEditting &&
            
                <Formik
                    initialValues = {roommateRequestInitialValues}
                    validationSchema = {updateRoommateRequestValidation}
                    onSubmit = {updateRoommateRequest}
                >
                
                {formik => (
                
                    <form className={styles.formGroupForm} onSubmit={(e) => updateRoommateRequest(e, formik.errors)} >
                        <div className={styles.inputForm}>

                        <H1>Edit Roommate Request</H1>

                        <div className={styles.inputCategory}>
                            <H3>Where is your room located?</H3>
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
                                {((formik.touched.country && formik.errors.country) &&<ErrorAlert>{formik.errors.country}</ErrorAlert>)}
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
                                {((formik.touched.state && formik.errors.state) &&<ErrorAlert>{formik.errors.state}</ErrorAlert>)}
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
                                {((formik.touched.city && formik.errors.city) &&<ErrorAlert>{formik.errors.city}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="street_address">Street Address</Label>
                                <Textarea 
                                    name="street_address"
                                    {...formik.getFieldProps('street_address')}
                                    placeholder="E.g  I am a church girl and I love playing music out loud. 
                                    Do not consider becoming my roommate if you hate loud music.">
                                </Textarea>
                                {((formik.touched.street_address && formik.errors.street_address) &&<ErrorAlert>{formik.errors.street_address}</ErrorAlert>)}
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
                                {((formik.touched.room_type && formik.errors.room_type) &&<ErrorAlert>{formik.errors.room_type}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="no_of_persons">No of persons to occupy the apartment</Label>
                                <Input  name="no_of_persons" placeholder="Please type in the total number of occupants in your room" type="text" {...formik.getFieldProps('no_of_persons')}/>
                                {((formik.touched.no_of_persons && formik.errors.no_of_persons) &&<ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="no_of_current_roomies">No of current roommates/flatmates</Label>
                                <Input  name="no_of_current_roomies" placeholder="Please type in the number of roommates you currently have" type="text" {...formik.getFieldProps('no_of_current_roomies')}/>
                                {((formik.touched.no_of_current_roomies && formik.errors.no_of_current_roomies) &&<ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>)}
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
                                {((formik.touched.amenities && formik.errors.amenities) &&<ErrorAlert>{formik.errors.amenities}</ErrorAlert>)}
                            </div>
                        </div>
                        
                        <div className={styles.inputCategoryDivider}></div>

                        <div className={styles.inputCategory}>
                            <H3>Move-in date and pricing</H3>
                            <div className={styles.inputGroup}>
                                <Label name="date_to_move">How soon can your roommate move in?</Label>
                                <Input  name="date_to_move" type="date" placeholder="Select a date" {...formik.getFieldProps('date_to_move')}/>
                                {((formik.touched.date_to_move && formik.errors.date_to_move) &&<ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="rent_per_person">Rent per person (in naira)?</Label>
                                <Input  name="rent_per_person" type="text" placeholder="Please enter the rent each person is to pay" {...formik.getFieldProps('rent_per_person')}/>
                                {((formik.touched.rent_per_person && formik.errors.rent_per_person) &&<ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="additional_cost">Are there additional costs?</Label>
                                <Textarea 
                                    name="additional_cost"
                                    {...formik.getFieldProps('additional_cost')}
                                    placeholder="E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour.">
                                </Textarea>
                                {((formik.touched.additional_cost && formik.errors.additional_cost) &&<ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>)}
                            </div>
                        </div>
                        
                        <div className={styles.inputCategoryDivider}></div>

                        <div className={styles.inputCategory}>
                            <H3>What does your room look like?</H3>
                            <div className={styles.inputGroup}>
                                <Label>Please add at least four pictures of different parts of your room e.g bedroom, kitchen, bathroom, balcony, etc. </Label>
                                <FileInput
                                    name="request_images"
                                    required={false}
                                    multiple
                                    onChange={(name, value) => {formik.setFieldValue(name, value)}}
                                    onBlur={formik.handleBlur}
                                />
                                {((formik.touched.request_images && formik.errors.request_images) &&<ErrorAlert>{formik.errors.request_images}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="listing_title">Add a suitable title for your room listing</Label>
                                <Input  name="listing_title" type="text" placeholder="E.g Bedroom flat in Bodija, Ibadan." {...formik.getFieldProps('listing_title')}/>
                                {((formik.touched.listing_title && formik.errors.listing_title) &&<ErrorAlert>{formik.errors.listing_title}</ErrorAlert>)}
                            </div>

                            <div className={styles.inputGroup}>
                                <Label name="additional_information">Are there additional information</Label>
                                <Textarea 
                                    name="additional_information"
                                    {...formik.getFieldProps('additional_information')}
                                    placeholder="I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.">
                                </Textarea>
                                {((formik.touched.additional_information && formik.errors.additional_information) &&<ErrorAlert>{formik.errors.additional_information}</ErrorAlert>)}
                            </div>
                        </div>
                        
                        <Button className={isLoading ? "isLoading" : ""} type="submit">{isLoading ? "Loading..." : "Save changes"} </Button>
                    
                    </div>
                    </form>

                    )}
                </Formik>
                }

                {updateRoommateRequestSuccess && <div className={styles.successMessage}>Request updated successfully</div>}

            </SingleConnectionReceivedTemplate>
        );
}
 
export default SingleRequest;