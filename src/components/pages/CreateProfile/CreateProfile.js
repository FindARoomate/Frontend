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
import ErrorAlert from '../../ui/molecules/Alerts/ErrorAlert/ErrorAlert';

const CreateProfile = () => 
{

    const token =  "Bearer " + localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const {isError, isSuccess, APIdata, sendPostRequest} = usePost(CREATE_PROFILE, myHeaders);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    


    const moveToNextFormGroup = (current_index) => 
    {
        const {formStatus, message, input} = validateForm(current_index);

        if(formStatus)
        {
            setError("");//clear error message
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
            setError(message);

            const formGroup = document.querySelectorAll(`.${styles.formGroup}`)[current_index-1];
            const buttons = formGroup.querySelectorAll("button");
            const lastButton = buttons[buttons.length - 1];//get last button in formgroup 
            lastButton.style.border = "1px solid red";
            input.style.border = "1px solid red";

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

    const validateForm = (current_index) =>
    {
        var formStatus = true;
        var message = "";
        var input = "";
        var label = "";

        const currentFormGroup = document.querySelectorAll(`.${styles.formGroup}`)[current_index-1];
        const formInputs = currentFormGroup.querySelectorAll(`input, select, textarea`);

        for(var i = 0; i< formInputs.length; i++)
        {
            if(!formInputs[i].value)
            {
                console.log(formInputs[i]);
                if(formInputs[i].name == "profile_picture")
                {
                    label = "Profile Picture";
                }else
                {
                    label = document.querySelector(`label[name=${formInputs[i].name}]`).innerText;
                }

                message = "The '" + label + "' field is required";
                formStatus = false;
                input = formInputs[i];
                break;
            }
        }

        return {formStatus, message, input}
    }

    const handleCreateProfile = (e) => 
    {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("fullname", document.querySelector("input[name='fullname']").value);
        formData.append("religion", document.querySelector("select[name='religion']").value);
        formData.append("gender", document.querySelector("select[name='gender']").value);
        formData.append("phone_number", document.querySelector("input[name='tel']").value);
        formData.append("personality", document.querySelector("select[name='personality']").value);
        formData.append("profession", document.querySelector("input[name='profession']").value);
        formData.append("bio", document.querySelector("textarea[name='bio']").value);
        formData.append("age_range", document.querySelector("select[name='age_range']").value);
        formData.append("roomie_gender", document.querySelector("input[name='roomie_gender']").value);
        formData.append("roomie_religion", document.querySelector("input[name='roomie_religion']").value);
        formData.append("roomie_age", 13);
        formData.append("roomie_personality", document.querySelector("input[name='roomie_personality']").value);
        formData.append("roomate_description", document.querySelector("textarea[name='roomate_description']").value);
        formData.append("profile_picture", document.querySelector("input[name='profile_picture']").value);

        //create profile record on backend
        sendPostRequest(formData);
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

        <form className={styles.formGroupForm} onSubmit={handleCreateProfile}>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <div id={styles.formGroup1} className={`${styles.formGroup} ${styles.formGroupActive}`}>
            <div className={styles.inputGroup}>
                <Label name="fullname">Name</Label>
                <Input required name="fullname" type="text" placeholder="Firstname Lastname"/>
            </div>
            <div className={styles.inputGroup}>
                <Label name="email">Email</Label>
                <Input required name="email" type="email" placeholder="email@gmail.com"/>
            </div>
            <div className={styles.inputGroup}>
                <Label name="tel">Phone Number</Label>
                <Input required name="tel" type="number" placeholder="+234-123-456-789"/>
            </div>
            <div className={styles.inputGroup}>
                <Label name="gender">Gender</Label>
                <Select name="gender" required>
                    <option value="">Select a gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </Select>
            </div>
            <div className={styles.inputGroup}>
                <Label name="age_range">Age Range</Label>
                <Select name="age_range" required>
                    <option value="">Select an age range</option>
                    <option>{"< 16"}</option>
                    <option>16 - 20</option>
                    <option>21 - 25</option>
                    <option>25 - 30</option>
                    <option>{"> 30"}</option>
                </Select>
            </div>
            <Button type="button" className="ml-auto" onClick={() => moveToNextFormGroup(1)}>Next <Img src={nextIcon}/></Button>
        </div>

        <div className={`${styles.formGroup}`}>
            <div className={styles.inputGroup}>
                <FileInput
                    name="profile_picture"
                    required
                />
            </div>
            <div className={styles.inputGroup}>
                <Label name="religion">Religion</Label>
                <Select name="religion" required>
                    <option value="">Select a religion</option>
                    <option value="CHRISTIANITY">Christianity</option>
                    <option value="ISLAM">Islam</option>
                    <option value="OTHER">Other</option>
                </Select>
            </div>
            <div className={styles.inputGroup}>
                <Label name="personality">Personality</Label>
                <Select name="personality" required>
                    <option value="">Select a personality</option>
                    <option value="INTROVERT">Introvert</option>
                    <option value="EXTROVERT">Extrovert</option>
                </Select>
            </div>
            <div className={styles.inputGroup}>
                <Label name="profession">Profession</Label>
                <Input required name="profession" type="text" placeholder="e.g. UI/UX designer"/>

            </div>
            <div className={styles.inputGroup}>
                <Label name="bio">Short Bio</Label>
                <Textarea 
                    name="bio"
                    required
                    placeholder="E.g  I am a church girl and I love playing music out loud. 
                    Do not consider becoming my roommate if you hate loud music.">
                </Textarea>
            </div>
            <div className={styles.buttonGroup}>
                <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(2)}>Previous</Button>
                <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(2)}>Next <Img src={nextIcon}/></Button>
            </div>
        </div>

        <div className={`${styles.formGroup}`}>

            <div className={styles.inputGroup}>
                <Label name="roomie_gender" className={styles.radioGroupLabel}>I need a ________ roommate</Label>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_gender" value="MALE"/>
                    <Label>Male</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_gender" value="FEMALE"/>
                    <Label>Female</Label>
                </span>
            </div>

            <div className={styles.inputGroup}>
                <Label name="roomie_religion" className={styles.radioGroupLabel}>I would like my roommate to be a</Label>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_religion" value="CHRISTIANITY"/>
                    <Label>Christian</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_religion" value="ISLAM"/>
                    <Label>Muslim</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_religion" value="I_DONT_MIND"/>
                    <Label>I don't mind</Label>
                </span>
            </div>

            <div className={styles.inputGroup}>
                <Label name="roomie_personality" className={styles.radioGroupLabel}>I would like my roommate to be an</Label>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_personality" value="INTROVERT"/>
                    <Label>Introvert</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_personality" value="EXTROVERT"/>
                    <Label>Extrovert</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_personality" value="I_DONT_MIND"/>
                    <Label>I don't mind</Label>
                </span>
            </div>

            <div className={styles.inputGroup}>
                <Label name="roomie_age_range" className={styles.radioGroupLabel}>My roommate should be of this age range</Label>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_age_range" value="< 16"/>
                    <Label>{"< 16"}</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_age_range" value="16 - 20"/>
                    <Label>16 - 20</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_age_range" value="21 - 25"/>
                    <Label>21 - 25</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_age_range" value="25 - 30"/>
                    <Label>25 - 30</Label>
                </span>
                <span className={styles.radioGroup}>
                    <Input required type="radio" name="roomie_age_range" value="> 30"/>
                    <Label>{"> 30"}</Label>
                </span>
            </div>
            <div className={styles.inputGroup}>
                <Label name="roomate_description" className={styles.radioGroupLabel}>Define your ideal roomate in words</Label>
                <Textarea 
                    name="roomate_description"
                    required
                    placeholder="E.g  I’d love to have a neat roommate. I can not cope in a dirty environment.">
                </Textarea>
            </div>

            <div className={styles.buttonGroup}>
                <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(3)}>Previous</Button>
                <Button className={`${styles.submitButton}`} type="submit">
                    {isLoading ? "Loading..." : 
                    <>
                        <Img src={checkIcon} customStyle={{margin: "auto 6px auto 0"}}/> Done 
                    </>}
                </Button>
            </div>
        </div>
        </form>
        </div>
        </>
        
            
     );
}
 
export default CreateProfile;