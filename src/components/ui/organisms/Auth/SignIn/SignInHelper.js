import * as Yup from 'yup';

export const signInInitialValues = 
{
    email : '',
    password: '',
}

export const signInValidation = 
 Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().min(8, "Password must be a minimum of 8 characters").required('Password is required'), 
});

