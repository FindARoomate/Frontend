import * as Yup from 'yup';

export const updateRoommateRequestInitialValues = (data) => 
{
    if(!data)
    {
        return {
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
    }

    if(data)
    {
        return {
            country: data.country,
            state: data.state,
            city: data.city,
            street_address: data.street_address,
            room_type: data.room_type,
            no_of_persons: data.no_of_persons,
            no_of_current_roomies: data.no_of_current_roomies, 
            date_to_move: data.date_to_move, 
            rent_per_person: data.rent_per_person, 
            additional_cost: data.additional_cost, 
            request_images: '',//data.request_images, 
            listing_title: data.listing_title,
            amenities: data.amenities,
            additional_information: data.additional_information,
        }
    }
    console.log(data);
}

export const updateRoommateRequestValidation = 
 Yup.object({
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        street_address:  Yup.string().required('Street Address is required'),
        room_type: Yup.string().required('Room Type is required'),
        no_of_persons: Yup.number().typeError('Kindly enter a numeric value')
                        .integer("This value must be an integer")
                        .min(1, 'Value should be greater than 0')
                        .required('No of persons to occupy the apartment is required'),
        no_of_current_roomies:  Yup.number().typeError('Kindly enter a numeric value')
                                .integer("This value must be an integer")
                                .min(1, 'Value should be greater than 0')
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
        // request_images: Yup.mixed()
        //                 .test('minValue', 'Please select at least 4 images', 
        //                     (value) => {
        //                         if(value)
        //                         {
        //                             if(value.length < 4) return false;
        //                             return true;
        //                         }else
        //                         {
        //                             return false;
        //                         }
                                
        //                     })
        //                 .test('maxValue', 'Please select a maximum of 8 images',
        //                 (value) => {
        //                     if(value)
        //                     {
        //                         if((value.length) > 8) return false;
        //                         return true;
        //                     }else
        //                     {
        //                         return false;
        //                     }
        //                 }),
        additional_information: Yup.string().required('Additional Information is required'), 
});
    