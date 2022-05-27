import * as Yup from 'yup';
import Img from '../../ui/atoms/Img/Img';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CREATE_PROFILE } from '../../routes';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Label from '../../ui/atoms/Label/Label';
import Input from '../../ui/atoms/Input/Input';
import styles from './CreateProfile.module.css';
import Select from '../../ui/atoms/Select/Select';
import Button from '../../ui/atoms/Button/Button';
import usePost from '../../../customHooks/usePost';
import checkIcon from './../../../icons/check-icon.svg';
import Textarea from '../../ui/atoms/Textarea/Textarea';
import FileInput from '../../ui/atoms/FileInput/FileInput';
import nextIcon from './../../../icons/right-arrow-icon.svg';
import { Formik, Field } from 'formik';
import ErrorAlert from '../../ui/molecules/Alerts/ErrorAlert/ErrorAlert';
import {createProfileInitialValues, createProfileValidation, validateForm} from './CreateProfileHelper';

const CreateProfile = () => 
{

    const token =  "Bearer " + localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_PROFILE, myHeaders);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);


    const moveToNextFormGroup = (current_index, errors) => 
    {        
        const {formStatus, message} = validateForm(current_index, errors);

        if(formStatus)
        {
            setError("");//clear error message
            setNextButtonClicked(false);

            const formGroups = document.querySelectorAll(`.${styles.formGroup}`);
            const progressSteps = document.querySelectorAll(`.${styles.progressStep}`);
            const currentProgress = document.querySelector(`.${styles.currentProgress}`);
            const numOfSteps = 3;
            const progressPerStep = 100/(numOfSteps-1);

            formGroups[current_index-1].classList.remove(styles.formGroupActive); //remove active class from current form group
            formGroups[current_index].classList.add(styles.formGroupActive); //add active class to next form group
            
            progressSteps[current_index-1].classList.remove(styles.progressStepActive); //remove active class from current progress step
            progressSteps[current_index-1].classList.add(styles.progressStepVisited); //add visited class to current progress step
            progressSteps[current_index].classList.add(styles.progressStepActive); //add active class to next progress step
            
            currentProgress.style.width = (progressPerStep*current_index) + '%';

        }else
        {
            setNextButtonClicked(true);
            setError(message);
        }
        
    }

    const moveToPreviousFormGroup = (current_index) => 
    {
        const formGroups = document.querySelectorAll(`.${styles.formGroup}`);
        const progressSteps = document.querySelectorAll(`.${styles.progressStep}`);
        const currentProgress = document.querySelector(`.${styles.currentProgress}`);
        const numOfSteps = 3;
        const progressPerStep = 100/(numOfSteps-1);

        formGroups[current_index-1].classList.remove(styles.formGroupActive);//remove active class from current form group
        formGroups[current_index-2].classList.add(styles.formGroupActive);//add active class to previous form group
        
        
        progressSteps[current_index-1].classList.remove(styles.progressStepActive);//remove active class from current progress step
        progressSteps[current_index-2].classList.remove(styles.progressStepVisited);//remove visited class from previous progress step
        progressSteps[current_index-2].classList.add(styles.progressStepActive);//add active class to previous progress step

        currentProgress.style.width = (progressPerStep*(current_index-2)) + '%'
    }

    
    const handleCreateProfile = (e, errors) => 
    {
        e.preventDefault();

        const {formStatus, message} = validateForm(3, errors);
        setIsLoading(true);

        if(formStatus)
        {
            const formData = new FormData();
            formData.append("fullname", document.querySelector("input[name='fullname']").value);
            formData.append("religion", document.querySelector("select[name='religion']").value);
            formData.append("gender", document.querySelector("select[name='gender']").value);
            formData.append("phone_number", document.querySelector("input[name='phone_number']").value);
            formData.append("personality", document.querySelector("select[name='personality']").value);
            formData.append("profession", document.querySelector("input[name='profession']").value);
            formData.append("bio", document.querySelector("textarea[name='bio']").value);
            formData.append("age_range", document.querySelector("select[name='age_range']").value);
            formData.append("roomie_gender", document.querySelector("input[name='roomie_gender']").value);
            formData.append("roomie_religion", document.querySelector("input[name='roomie_religion']").value);
            formData.append("roomie_age", 13);
            formData.append("roomie_personality", document.querySelector("input[name='roomie_personality']").value);
            formData.append("roomate_description", document.querySelector("textarea[name='roomate_description']").value);
            formData.append("profile_picture", document.querySelector("input[name='profile_picture']").files[0]);

            //create profile record on backend
            sendPostRequest(formData);

        }else
        {
            setIsLoading(false);
            setNextButtonClicked(true);
            setError(message);
        }
        
    }

    useEffect(() => 
    {
        if(isError) setError(APIdata.detail);
        if(isError || isSuccess) setIsLoading(false);

    }, [isError, isSuccess, APIdata]);


    return (   
        <>

        {isSuccess && <Navigate replace to="/create-profile-thankyou"/>}

        <div className={styles.createProfile}>
        <H1>CREATE PERSONAL PROFILE</H1>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
            <div className={styles.currentProgress}></div>

            <div className={`${styles.progressStep} ${styles.progressStepActive}`} data-step-description="Biodata"></div>
            <div className={`${styles.progressStep}`} data-step-description="Tell us about yourself"></div>
            <div className={`${styles.progressStep}`} data-step-description="Define your ideal roommate"></div>
        </div>

        <Formik
            initialValues = {createProfileInitialValues}
            validationSchema = {createProfileValidation}
            onSubmit = {handleCreateProfile}
        >
        
        {formik => (
        
            <form className={styles.formGroupForm} onSubmit={(e) => handleCreateProfile(e, formik.errors)}>
            <div id={styles.formGroup1} className={`${styles.formGroup} ${styles.formGroupActive}`}>

                <div className={styles.inputGroup}>
                    <Label name="fullname">Name</Label>
                    <Input name="fullname" type="text" placeholder="Firstname Lastname" {...formik.getFieldProps('fullname')}/>
                    {!nextButtonClicked && ((formik.touched.fullname && formik.errors.fullname) &&<ErrorAlert>{formik.errors.fullname}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.fullname && <ErrorAlert>{formik.errors.fullname}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="email">Email</Label>
                    <Input name="email" type="email" placeholder="email@gmail.com" {...formik.getFieldProps('email')}/>
                    {!nextButtonClicked && ((formik.touched.email && formik.errors.email) &&<ErrorAlert>{formik.errors.email}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.email && <ErrorAlert>{formik.errors.email}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="phone_number">Phone Number</Label>
                    <Input name="phone_number" type="tel" placeholder="+234-123-456-789" {...formik.getFieldProps('phone_number')}/>
                    {!nextButtonClicked && ((formik.touched.phone_number && formik.errors.phone_number) &&<ErrorAlert>{formik.errors.phone_number}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.phone_number && <ErrorAlert>{formik.errors.phone_number}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="gender">Gender</Label>
                    <Select name="gender" {...formik.getFieldProps('gender')}>
                        <option value="">Select a gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </Select>
                    {!nextButtonClicked && ((formik.touched.gender && formik.errors.gender) &&<ErrorAlert>{formik.errors.gender}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.gender && <ErrorAlert>{formik.errors.gender}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="age_range">Age Range</Label>
                    <Select name="age_range" {...formik.getFieldProps('age_range')} >
                        <option value="">Select an age range</option>
                        <option>{"< 16"}</option>
                        <option>16 - 20</option>
                        <option>21 - 25</option>
                        <option>25 - 30</option>
                        <option>{"> 30"}</option>
                    </Select>
                    {!nextButtonClicked && ((formik.touched.age_range && formik.errors.age_range) &&<ErrorAlert>{formik.errors.age_range}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.age_range && <ErrorAlert>{formik.errors.age_range}</ErrorAlert>)}
                </div>

                <div className='ml-auto'>
                    <Button type="button" onClick={() => moveToNextFormGroup(1, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
               
            </div>

            <div className={`${styles.formGroup}`}>
                <div className={styles.inputGroup}>
                    <FileInput
                        name="profile_picture"
                        onChange={(name, value) => {formik.setFieldValue(name, value)}}
                        onBlur={formik.handleBlur}
                    />
                    {!nextButtonClicked && ((formik.touched.profile_picture && formik.errors.profile_picture) &&<ErrorAlert>{formik.errors.profile_picture}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.profile_picture && <ErrorAlert>{formik.errors.profile_picture}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="religion">Religion</Label>
                    <Select name="religion" {...formik.getFieldProps('religion')}>
                        <option value="">Select a religion</option>
                        <option value="CHRISTIANITY">Christianity</option>
                        <option value="ISLAM">Islam</option>
                        <option value="OTHER">Other</option>
                    </Select>
                    {!nextButtonClicked && ((formik.touched.religion && formik.errors.religion) &&<ErrorAlert>{formik.errors.religion}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.religion && <ErrorAlert>{formik.errors.religion}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="personality">Personality</Label>
                    <Select name="personality" {...formik.getFieldProps('personality')}>
                        <option value="">Select a personality</option>
                        <option value="INTROVERT">Introvert</option>
                        <option value="EXTROVERT">Extrovert</option>
                    </Select>
                    {!nextButtonClicked && ((formik.touched.personality && formik.errors.personality) &&<ErrorAlert>{formik.errors.personality}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.personality && <ErrorAlert>{formik.errors.personality}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="profession">Profession</Label>
                    <Input  name="profession" type="text" placeholder="e.g. UI/UX designer" {...formik.getFieldProps('profession')}/>
                    {!nextButtonClicked && ((formik.touched.profession && formik.errors.profession) &&<ErrorAlert>{formik.errors.profession}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.profession && <ErrorAlert>{formik.errors.profession}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="bio">Short Bio</Label>
                    <Textarea 
                        name="bio"
                        {...formik.getFieldProps('bio')}
                        placeholder="E.g  I am a church girl and I love playing music out loud. 
                        Do not consider becoming my roommate if you hate loud music.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.bio && formik.errors.bio) &&<ErrorAlert>{formik.errors.bio}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.bio && <ErrorAlert>{formik.errors.bio}</ErrorAlert>)}
                </div>

                <div>
                    <div className={styles.buttonGroup}>
                        <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(2)}>Previous</Button>
                        <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(2, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    </div>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>

            </div>

            <div className={`${styles.formGroup}`} id={styles.formGroup3}>
                <div className={styles.inputGroup}>
                    <Label name="roomie_gender" className={styles.radioGroupLabel}>I need a ________ roommate</Label>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_gender" value="MALE"/>
                        <Label>Male</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_gender" value="FEMALE"/>
                        <Label>Female</Label>
                    </span>
                    {!nextButtonClicked && ((formik.touched.roomie_gender && formik.errors.roomie_gender) &&<ErrorAlert>{formik.errors.roomie_gender}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.roomie_gender && <ErrorAlert>{formik.errors.roomie_gender}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="roomie_religion" className={styles.radioGroupLabel}>I would like my roommate to be a</Label>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_religion" value="CHRISTIANITY"/>
                        <Label>Christian</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_religion" value="ISLAM"/>
                        <Label>Muslim</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_religion" value="I_DONT_MIND"/>
                        <Label>I don't mind</Label>
                    </span>
                    {!nextButtonClicked && ((formik.touched.roomie_religion && formik.errors.roomie_religion) &&<ErrorAlert>{formik.errors.roomie_religion}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.roomie_religion && <ErrorAlert>{formik.errors.roomie_religion}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="roomie_personality" className={styles.radioGroupLabel}>I would like my roommate to be an</Label>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_personality" value="INTROVERT"/>
                        <Label>Introvert</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_personality" value="EXTROVERT"/>
                        <Label>Extrovert</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_personality" value="I_DONT_MIND"/>
                        <Label>I don't mind</Label>
                    </span>
                    {!nextButtonClicked && ((formik.touched.roomie_personality && formik.errors.roomie_personality) &&<ErrorAlert>{formik.errors.roomie_personality}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.roomie_personality && <ErrorAlert>{formik.errors.roomie_personality}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="roomie_age" className={styles.radioGroupLabel}>My roommate should be of this age range</Label>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_age" value="< 16"/>
                        <Label>{"< 16"}</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_age" value="16 - 20"/>
                        <Label>16 - 20</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_age" value="21 - 25"/>
                        <Label>21 - 25</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_age" value="25 - 30"/>
                        <Label>25 - 30</Label>
                    </span>
                    <span className={styles.radioGroup}>
                        <Field type="radio" name="roomie_age" value="> 30"/>
                        <Label>{"> 30"}</Label>
                    </span>
                    {!nextButtonClicked && ((formik.touched.roomie_age && formik.errors.roomie_age) &&<ErrorAlert>{formik.errors.roomie_age}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.roomie_age && <ErrorAlert>{formik.errors.roomie_age}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="roomate_description" className={styles.radioGroupLabel}>Define your ideal roomate in words</Label>
                    <Textarea 
                        name="roomate_description"
                        placeholder="E.g  I’d love to have a neat roommate. I can not cope in a dirty environment."
                        {...formik.getFieldProps('roomate_description')}
                    >
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.roomate_description && formik.errors.roomate_description) &&<ErrorAlert>{formik.errors.roomate_description}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.roomate_description && <ErrorAlert>{formik.errors.roomate_description}</ErrorAlert>)}
                </div>

                <div className={styles.buttonGroup}>
                    <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(3)}>Previous</Button>
                    <Button className={`${styles.submitButton} ${isLoading ? "isLoading": ""}`} type="submit">
                        {isLoading ? "Loading..." : 
                        <>
                            <Img src={checkIcon} customStyle={{margin: "auto 6px auto 0"}}/> Done 
                        </>}
                    </Button>
                </div>
            </div>
            </form>
            )}
        </Formik>
        </div>
        </>
        
            
     );
}
 
export default CreateProfile;