import styles from './CreateRoommateRequest.module.css';
import * as Yup from 'yup';

export const createRoommateRequestInitialValues = 
{
    country: '',
    state: '',
    city: '',
    street_address: '',
    room_type: '',
    no_of_persons: '',
    no_of_current_roomies: '', 
    date_to_move: '', 
    rent_per_person: '', 
    additional_cost: '', 
    request_images: '', 
    listing_title: '',
    amenities: [],
    additional_information: '', 
}

export const createRoommateRequestValidation = 
 Yup.object({
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        street_address:  Yup.string().required('Street Address is required'),
        room_type: Yup.string().required('Room Type is required'),
        no_of_persons: Yup.number().typeError('Kindly enter a numeric value')
                        .integer("This value must be an integer")
                        .min(0, 'Value should be greater than or equal to 0')
                        .required('No of persons to occupy the apartment is required'),
        no_of_current_roomies:  Yup.number().typeError('Kindly enter a numeric value')
                                .integer("This value must be an integer")
                                .min(0, 'Value should be greater than or equal to 0')
                                .test("maxValue", 'The number of current roommates has to be less than the total number of persons to occupy apartment',
                                (value) => 
                                {
                                    let no_of_persons = document.querySelector("input[name='no_of_persons']").value;
                                    return (value >= no_of_persons) ? false: true;
                                })
                                .required('No of current roommates/flatmates is required'),
        amenities: Yup.array().required('Please select at least one amenity'),
        date_to_move: Yup.date().min(Date(), 'Date To Move cannot be in the past').required('Date To Move is required'), 
        rent_per_person: Yup.number().typeError("Kindly enter a numeric value").required('Rent per person is required'),
        additional_cost: Yup.string().required('Additional cost is required'),
        listing_title: Yup.string().required('Listing Title is required'),
        request_images: Yup.mixed()
                        .test('minValue', 'Please select at least 4 images', 
                            (value) => {
                                if(value)
                                {
                                    if(value.length < 4) return false;
                                    return true;
                                }else
                                {
                                    return false;
                                }
                                
                            })
                        .test('maxValue', 'Please select a maximum of 8 images',
                        (value) => {
                            if(value)
                            {
                                if((value.length) > 8) return false;
                                return true;
                            }else
                            {
                                return false;
                            }
                        }),
        additional_information: Yup.string().required('Additional Information is required'), 
});

    

export const validateForm = (current_index, errors) =>
{

    var formStatus;
    var message = "Kindly attend to the error messages";
    
    if(current_index == 1)
    {
        formStatus =  (errors.country || errors.state || errors.city || errors.street_address) ? false : true;
    } 

    if(current_index == 2)
    {
        formStatus =  (errors.room_type || errors.no_of_persons || errors.no_of_current_roomies || errors.amenities) ? false : true;
    } 

    if(current_index == 3)
    {
        formStatus =  (errors.date_to_move || errors.rent_per_person || errors.additional_cost) ? false : true;
    } 

    if(current_index == 4)
    {
        formStatus =  (errors.roomie_gender || errors.roomie_religion || errors.roomie_no_of_current_roomies || errors.roomie_age || errors.roomie_description) ? false : true;
    } 

    //if there are no errors, ensure the user didn't just leave the whole form blank
    if(formStatus && current_index == 1)
    {
        const currentFormGroup = document.querySelectorAll(`.${styles.formGroup}`)[current_index-1];
        const formInputs = currentFormGroup.querySelectorAll(`input, select, textarea`);

        for(var i = 0; i< formInputs.length; i++)
        {
            
            if(!formInputs[i].value)
            {
                message = "All fields are required";
                formStatus = false;
                break;
            }
        }

    }
    
     return {formStatus, message}
}
