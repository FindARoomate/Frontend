export const API_URL = 'https://find-a-roomate.herokuapp.com';

export const JOIN_WAITLIST = API_URL+'/auth/join-waitlist/';

// Authentication endpoints

export const CREATE_ACCOUNT = API_URL+'/auth/register/';

export const LOGIN = API_URL+'/auth/login/';

export const CONFIRM_EMAIL = API_URL + '/auth/activate/';

export const REFRESH_TOKEN = API_URL + '/auth/refresh/'


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

export const UPDATE_ROOMMATE_REQUEST_START = API_URL + '/request/';

export const UPDATE_ROOMMATE_REQUEST_END =  '/update/';

export const ADD_IMAGES_TO_ROOMMATE_REQUEST = API_URL + '/image/request/';

//Connection endpoints
export const CREATE_CONNECTION_REQUEST = API_URL + '/connections/create/';

export const CONNECTION_RECEIVED = API_URL + '/connections/recieved/';

export const CONNECTION_SENT = API_URL + '/connections/sent/';

export const ACCEPT_CONNECTION = API_URL + '/connections/accept/';

export const REJECT_CONNECTION = API_URL + '/connections/reject/';

export const CANCEL_CONNECTION_START = API_URL + '/connections/';

export const CANCEL_CONNECTION_END = '/delete/';

export const DASHBOARD_STATISTICS = API_URL + '/statistics/';

// Profile
export const GET_PROFILE = API_URL + '/profile/get/';

export const GET_GUEST_PROFILE = API_URL + '/profile/';

export const UPDATE_PROFILE_START = API_URL + '/profile/';

export const UPDATE_PROFILE_END = '/update/';

// NOTIFICATION

export const GET_NOTIFICATIONS = API_URL + '/notifications/';

export const UPDATE_NOTIFICATIONS = API_URL + '/notifications/'