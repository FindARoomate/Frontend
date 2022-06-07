import * as Yup from 'yup';

export const updateProfileInitialValues = 
{
    fullname: '',
    email: '',
    phone_number: '',
    gender: '',
    age_range: '',
    phone_number: '', 
    personality: '', 
    profession: '',
    bio: '', 
    roomie_gender: '', 
    roomie_religion: '', 
    roomie_age: '', 
    roomie_personality: '',
    roomate_description: '', 
    profile_picture: '',
}

export const updateProfileValidation = 
 Yup.object({
        fullname: Yup.string().required('Fullname is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        phone_number: Yup.string().max(14, 'Phone number must be at most 14 characters')
                    .matches(/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                    'Oops. This doesn\'t look like a valid phone number')
                    .required("Phone number is required"),
        gender: Yup.mixed().oneOf(['MALE', 'FEMALE']).required('Gender is required'),
        personality: Yup.string().required('Personality is required'), 
        profession: Yup.string().required('Profession is required'),
        bio: Yup.string().required('Short Bio is required'), 
        age_range: Yup.mixed().oneOf(['< 16', '16 - 20', '21 - 25', '25 - 30','> 30'], 'Invalid age').required('Age Range is required'),
        roomie_gender: Yup.mixed().oneOf(['MALE', 'FEMALE']).required('Roommate Gender is required'), 
        roomie_religion: Yup.mixed().oneOf(['CHRISTIANITY', 'ISLAM', 'I_DONT_MIND'], 'Invalid Religion').required('Roommate Religion is required'), 
        roomie_personality: Yup.mixed().oneOf(['INTROVERT', 'EXTROVERT', 'I_DONT_MIND'], 'Invalid Personality').required('Roommate Religion is required'), 
        roomie_age: Yup.mixed().oneOf(['< 16', '16 - 20', '21 - 25', '25 - 30','> 30'], 'Invalid age').required('Roommate Age is required'), 
        roomate_description: Yup.string().required('Roommate Description is required'), 
        profile_picture:  Yup.mixed()
                            .test('minValue', 'Please select an image', 
                                (value) => {
                                    if(value)
                                    {
                                        if(value.length != 1) return false;
                                        return true;
                                    }else
                                    {
                                        return false;
                                    }
                                    
                                })
});

    
