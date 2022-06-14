import * as Yup from 'yup';

export const signUpInitialValues = 
{
    email : '',
    password: '',
    password_confirmation: ''
}

export const signUpValidation = 
 Yup.object({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string().min(8, "Password must be minimum of 8 characters").required('Password is required'), 
    password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required')
});

