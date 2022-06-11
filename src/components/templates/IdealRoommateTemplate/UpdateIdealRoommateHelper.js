import * as Yup from 'yup';

export const updateIdealRoommateValidation = 
 Yup.object({
        roomie_gender: Yup.mixed().oneOf(['MALE', 'FEMALE']).required('Roommate Gender is required'), 
        roomie_religion: Yup.mixed().oneOf(['CHRISTIANITY', 'ISLAM', 'I_DONT_MIND'], 'Invalid Religion').required('Roommate Religion is required'), 
        roomie_personality: Yup.mixed().oneOf(['INTROVERT', 'EXTROVERT', 'I_DONT_MIND'], 'Invalid Personality').required('Roommate Religion is required'), 
        roomie_age: Yup.mixed().oneOf(['< 16', '16 - 20', '21 - 25', '25 - 30','> 30'], 'Invalid age').required('Roommate Age is required'), 
        roomate_description: Yup.string().required('Roommate Description is required'), 
});

    
