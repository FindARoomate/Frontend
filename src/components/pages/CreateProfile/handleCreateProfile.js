// import { useState } from "react";

// export const useHandleCreateProfile = (e) => 
// {
//     const token =  "Bearer " + localStorage.getItem("accessToken");
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", token)
//     const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_PROFILE, myHeaders);

//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", document.querySelector("input[name='fullname']").value);
//     formData.append("religion", document.querySelector("select[name='religion']").value.toUpperCase());
//     formData.append("gender", document.querySelector("select[name='gender']").value);
//     formData.append("phone_number", document.querySelector("input[name='phone_number']").value);
//     formData.append("personality", document.querySelector("input[name='personality']").value.toUpperCase());
//     formData.append("profession", document.querySelector("input[name='profession']").value);
//     formData.append("bio", document.querySelector("textarea[name='bio']").value);
//     formData.append("age_range", document.querySelector("select[name='age_range']").value);
//     formData.append("roomie_gender", document.querySelector("input[name='roomie_gender']").value.toUpperCase());
//     formData.append("roomie_religion", document.querySelector("input[name='roomie_religion']").value.toUpperCase());
//     formData.append("roomie_age", 13);
//     formData.append("roomie_personality", document.querySelector("input[name='roomie_personality']").value.toUpperCase());
//     formData.append("roomate_description", document.querySelector("input[name='roomie_description']").value);
//     formData.append("profile_picture", document.querySelector("input[name='profile_picture']").value);

//     //create profile record on backend
//     sendPostRequest(formData);
// }