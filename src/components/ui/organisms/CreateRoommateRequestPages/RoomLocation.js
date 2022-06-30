import Img from "../../atoms/Img/Img";
import Label from "../../atoms/Label/Label";
import { useState, useEffect } from "react";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";
import Textarea from "../../atoms/Textarea/Textarea";
import nextIcon from './../../../../icons/right-arrow-icon.svg';
import ErrorAlert from "../../molecules/Alerts/ErrorAlert/ErrorAlert";

const RoomLocation = ({formik, error, styles, nextButtonClicked, moveToNextFormGroup}) => 
{
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("NG");

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
    //         console.log(body);

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
    
    useEffect(() => 
    {

        getStates();

        if(selectedState) getCities();

    }, [selectedState]);


    return ( 
        <>
            <div className={styles.inputGroup}>
            <Label name="country">Country</Label>
            <Select name="country" {...formik.getFieldProps('country')}>
                <option value="">Select a country</option>
                <option selected data-iso="NG">Nigeria</option>
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
    </>
      
     );
}
 
export default RoomLocation;