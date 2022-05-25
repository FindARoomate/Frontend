export const API_URL = 'https://find-a-roomate.herokuapp.com';

export const JOIN_WAITLIST = API_URL+'/auth/join-waitlist/';

// Authentication endpoints

export const CREATE_ACCOUNT = API_URL+'/auth/register/';

export const LOGIN = API_URL+'/auth/login/';

export const CONFIRM_EMAIL = API_URL + '/auth/activate/';



export const CONTACT = API_URL + '/auth/contact-us/';

export const CREATE_PROFILE = API_URL + '/profile/create/';

// Roommate Requests
export const GET_ALL_ROOMMATE_REQUESTS = API_URL + '/request/get/';

export const GET_SINGLE_ROOMMATE_REQUEST = API_URL + '/request/get/';

export const CREATE_ROOMMATE_REQUEST = API_URL + '/request/create/';

export const USER_INACTIVE_REQUESTS = API_URL + '/request/users/inactive/';

export const USER_ACTIVE_REQUESTS = API_URL + '/request/users/active/';

export const ACTIVATE_ROOMMATE_REQUEST = API_URL + '/request/activate/';

export const DEACTIVATE_ROOMMATE_REQUEST = API_URL + '/request/deactivate/';

// Profile
export const GET_PROFILE = API_URL + '/profile/get/';