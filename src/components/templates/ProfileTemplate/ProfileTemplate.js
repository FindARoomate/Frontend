import SingleConnectionReceivedTemplate from "../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate";
import ErrorAlert from "../../ui/molecules/Alerts/ErrorAlert/ErrorAlert";
import { UPDATE_PROFILE_END, UPDATE_PROFILE_START } from "../../routes";
import { updateProfileValidation } from "./UpdateProfileHelper";
import Textarea from "../../ui/atoms/Textarea/Textarea";
import backIcon from './../../../icons/back-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import { Formik, useFormik, Field } from 'formik';
import styles from './ProfileTemplate.module.css';
import Button from "../../ui/atoms/Button/Button";
import Select from "../../ui/atoms/Select/Select";
import Input from "../../ui/atoms/Input/Input";
import Img from './../../ui/atoms/Img/Img';
import { useState, useEffect, useContext } from "react";
import IconFileInput from "../../ui/atoms/IconFileInput/IconFileInput";
import { UserContext } from "../../context";


const ProfileTemplate = () => 
{

    let {userProfile, setUserProfile} = useContext(UserContext);
    console.log(userProfile);
    const [profile, setProfile] = useState(userProfile);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(userProfile.image_url);
    const [isCurrentlyEditting, setIsCurrentlyEditting] = useState(false);


    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const {isSuccess, isError, APIData, sendPatchRequest} = usePatch(myHeaders);


    const getImages = ( files) => 
    {
        if(files[0])
        {
            setProfileImage(URL.createObjectURL(files[0]));
        }
    }

    const handleBack = () => 
    {
        return !isCurrentlyEditting ? window.history.back() : setIsCurrentlyEditting(false);
    }

    const handleUpdateProfile = (e, dirtyFields) => 
    {
        e.preventDefault();
        setIsLoading(true);

        let updateUrl = UPDATE_PROFILE_START + profile.id + UPDATE_PROFILE_END;
        const formData = new FormData();
        dirtyFields.fullname && formData.append("fullname", document.querySelector("input[name='fullname']").value);
        dirtyFields.religion && formData.append("religion", document.querySelector("select[name='religion']").value);
        dirtyFields.gender && formData.append("gender", document.querySelector("select[name='gender']").value);
        dirtyFields.phone_number && formData.append("phone_number", document.querySelector("input[name='phone_number']").value);
        dirtyFields.personality && formData.append("personality", document.querySelector("select[name='personality']").value);
        dirtyFields.profession && formData.append("profession", document.querySelector("input[name='profession']").value);
        dirtyFields.bio && formData.append("bio", document.querySelector("textarea[name='bio']").value);
        dirtyFields.age_range && formData.append("age_range", document.querySelector("select[name='age_range']").value);
        dirtyFields.profile_picture && formData.append("profile_picture", document.querySelector("input[name='profile_picture']").files[0]);
        
        //update profile record on backend
        sendPatchRequest(updateUrl, formData);

    }

    useEffect(() =>
    {

        if(isSuccess || isError) 
        {
            setIsLoading(false);
            setIsCurrentlyEditting(false);
        }
        
        if(isSuccess)
        {
            setUserProfile(APIData)
            window.location.reload();
        }

    }, [isSuccess, isError, APIData])
   

    return ( 
        <SingleConnectionReceivedTemplate>
             <div className={styles.backNavigation} onClick={handleBack}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>
                
                <div className={styles.profileInfoContainer}>
                {
                    !isCurrentlyEditting &&
                    <div>
                        <Button type="button" className={styles.editButton} handleOnClick={() => setIsCurrentlyEditting(true)}>Edit Profile</Button>
                    </div>
                }

                <Formik
                    initialValues = {profile}
                    validationSchema = {updateProfileValidation}
                    onSubmit = {handleUpdateProfile}
                >
                
                {formik => (
                <form onSubmit={(e) => handleUpdateProfile(e, formik.touched)}>
                <div className={styles.profileImageRow}>
                    <div className={styles.profileImageContainer}>
                        <span className={styles.profileImage}>
                            <Img src={profileImage}/>
                        </span>
                        {isCurrentlyEditting &&
                        <span className={styles.addProfileImageIcon}>
                            <IconFileInput
                                onChange={(name, value) => {formik.setFieldValue(name, value)}}
                                onBlur={formik.handleBlur}
                                required={false}
                                name="profile_picture"
                                getImages={getImages}
                            />
                        </span>
                        }
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Name</span>
                        {!isCurrentlyEditting &&  <span className={styles.value}>{profile ? profile.fullname : "Loading..."}</span>}
                        {isCurrentlyEditting && 
                            <>
                                <Input name="fullname" type="text" placeholder="Firstname Lastname" {...formik.getFieldProps('fullname')}/>
                                {(formik.errors.fullname && <ErrorAlert>{formik.errors.fullname}</ErrorAlert>)}
                            </>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Phone number</span>
                            {!isCurrentlyEditting && <span className={styles.value}>{profile ? profile.phone_number : "Loading..."}</span>}
                            {isCurrentlyEditting && 
                            <>
                                <Input name="phone_number" type="tel" placeholder="+234-123-456-789" {...formik.getFieldProps('phone_number')}/>
                                {(formik.errors.phone_number && <ErrorAlert>{formik.errors.phone_number}</ErrorAlert>)}
                            </>
                            }
                        </div>
                    </div>
                    {/* <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Email</span>
                            {!isCurrentlyEditting && <span className={styles.value}>{profile ? profile.email : "Loading..."}</span> }
                            {isCurrentlyEditting && 
                            <>
                                <Input name="email" type="email" placeholder="email@gmail.com" {...formik.getFieldProps('email')}/>
                                {(formik.errors.email && <ErrorAlert>{formik.errors.email}</ErrorAlert>)}
                            </>
                            }
                        </div>
                    </div> */}
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Gender</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile?.gender?.toLowerCase() : "Loading..."}
                                </span>
                            }
                            {
                                isCurrentlyEditting &&
                                <>
                                    <Select name="gender" {...formik.getFieldProps('gender')}>
                                        <option value="">Select a gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </Select>
                                    {((formik.touched.gender && formik.errors.gender) &&<ErrorAlert>{formik.errors.gender}</ErrorAlert>)}
                                </>                     
                            }
                            
                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Profession</span>
                            {!isCurrentlyEditting && <span className={styles.value}>{profile ? profile.profession : "Loading..."}</span>} 
                            {
                                isCurrentlyEditting &&
                                <>
                                    <Input  name="profession" type="text" placeholder="e.g. UI/UX designer" {...formik.getFieldProps('profession')}/>
                                    {((formik.touched.profession && formik.errors.profession) &&<ErrorAlert>{formik.errors.profession}</ErrorAlert>)}
                                </>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Age range</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.age_range : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <>
                                <Select name="age_range" {...formik.getFieldProps('age_range')} >
                                    <option value="">Select an age range</option>
                                    <option>{"< 16"}</option>
                                    <option>16 - 20</option>
                                    <option>21 - 25</option>
                                    <option>25 - 30</option>
                                    <option>{"> 30"}</option>
                                </Select>
                                {((formik.touched.age_range && formik.errors.age_range) &&<ErrorAlert>{formik.errors.age_range}</ErrorAlert>)}
                                </>         
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Religion</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile?.religion?.toLowerCase() : "Loading..."}
                                </span>                            }
                            {
                                isCurrentlyEditting &&
                                <>
                                 <Select name="religion" {...formik.getFieldProps('religion')}>
                                    <option value="">Select a religion</option>
                                    <option value="CHRISTIANITY">Christianity</option>
                                    <option value="ISLAM">Islam</option>
                                    <option value="OTHER">Other</option>
                                </Select>
                                {((formik.touched.religion && formik.errors.religion) &&<ErrorAlert>{formik.errors.religion}</ErrorAlert>)}
                                </>    
                            }
                            
                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Personality</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile?.personality?.toLowerCase() : "Loading..."}
                                </span>                            
                            }
                            {
                                isCurrentlyEditting &&
                                <Select name="personality" defaultValue={profile ? profile.personality : ""}>
                                    <option value="INTROVERT">Introvert</option>
                                    <option value="EXTROVERT">Extrovert</option>
                                </Select>                            
                            }                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Short Bio</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.bio: "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <>
                                <Textarea 
                                    name="bio"
                                    {...formik.getFieldProps('bio')}
                                    placeholder="E.g  I am a church girl and I love playing music out loud. 
                                    Do not consider becoming my roommate if you hate loud music.">
                                </Textarea>
                                {((formik.touched.bio && formik.errors.bio) &&<ErrorAlert>{formik.errors.bio}</ErrorAlert>)}
                                </>
                            }
                            
                        </div>
                    </div>
                    {
                        isCurrentlyEditting &&
                        <div>
                            <Button className={`${styles.updateButton} ${isLoading ? "isLoading" : ""}`} >{isLoading ? "Loading..." : "Update"}</Button>
                        </div>
                    }
                    </form>
                )
                    }
                    </Formik>
                </div>
                {isSuccess && <div className={styles.successMessage}>Profile updated successfully</div>}
        </SingleConnectionReceivedTemplate>
     );
}
 
export default ProfileTemplate;