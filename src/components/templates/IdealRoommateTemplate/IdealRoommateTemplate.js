import SingleConnectionReceivedTemplate from "../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate";
import { updateIdealRoommateValidation } from "./UpdateIdealRoommateHelper";
import ErrorAlert from "../../ui/molecules/Alerts/ErrorAlert/ErrorAlert";
import { UPDATE_PROFILE_END, UPDATE_PROFILE_START } from "../../routes";
import Textarea from "../../ui/atoms/Textarea/Textarea";
import styles from "./IdealRoommateTemplate.module.css";
import backIcon from './../../../icons/back-icon.svg';
import usePatch from "../../../customHooks/usePatch";
import { Formik, useFormik, Field } from 'formik';
import Button from "../../ui/atoms/Button/Button";
import Select from "../../ui/atoms/Select/Select";
import H1 from "../../ui/atoms/Headings/H1/H1";
import Label from "../../ui/atoms/Label/Label";
import { useState, useContext} from "react";
import { UserContext } from '../../context';
import Img from './../../ui/atoms/Img/Img';
import { useEffect } from "react";

const IdealRoommateTemplate = () => 
{
    const [isLoading, setIsLoading] = useState(false);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    const {isSuccess, isError, APIData, sendPatchRequest} = usePatch(myHeaders);

    const {userProfile, setUserProfile} = useContext(UserContext);

    const updateIdealRoommate = (e, dirtyFields) => 
    {
        e.preventDefault();
        setIsLoading(true);

        let updateUrl = UPDATE_PROFILE_START + userProfile.id + UPDATE_PROFILE_END;
        const formData = new FormData();
        dirtyFields.roomie_age && formData.append("roomie_age", document.querySelector("select[name='roomie_age']").value);
        dirtyFields.roomie_gender && formData.append("roomie_gender", document.querySelector("select[name='roomie_gender']").value);
        dirtyFields.roomie_religion && formData.append("roomie_religion", document.querySelector("select[name='roomie_religion']").value);
        dirtyFields.roomie_personality && formData.append("roomie_personality", document.querySelector("select[name='roomie_personality']").value);
        dirtyFields.roomate_description && formData.append("roomate_description", document.querySelector("textarea[name='roomate_description']").value);
        
        //update profile record on backend
        sendPatchRequest(updateUrl, formData);
    }

    const idealRoommateInitialValues = 
    {

        roomie_gender: userProfile.roomie_gender, 
        roomie_religion: userProfile.roomie_religion, 
        roomie_age: userProfile.roomie_age, 
        roomie_personality: userProfile.roomie_personality,
        roomate_description: userProfile.roomate_description, 
    }

    useEffect(() =>
    {

        if(isSuccess || isError) 
        {
            setIsLoading(false);
        }
        
        if(isSuccess)
        {
            setUserProfile(APIData)
        }

    }, [isSuccess, isError, APIData, userProfile])

    return ( 
    <SingleConnectionReceivedTemplate>

        <div className={styles.backNavigation} onClick={() => window.history.back()}>
            <Img src={backIcon} />
            <span>Back</span>
        </div>

        <div className={styles.profileInfoContainer}>
            <Formik
                initialValues = {idealRoommateInitialValues}
                validationSchema = {updateIdealRoommateValidation}
                onSubmit = {updateIdealRoommate}
            >
        
            {formik => (
            
                <form className={styles.formGroupForm} onSubmit={(e) => updateIdealRoommate(e, formik.touched)}>
                    <div className={styles.inputForm}>
                        <H1>Ideal Roommate Profile</H1>
                    <div className={styles.inputCategory}>
                        <div className={styles.inputGroup}>
                            <Label name="roomie_gender">Gender</Label>
                            <Select name="roomie_gender" {...formik.getFieldProps('roomie_gender')}>
                                <option value="FEMALE">Female</option>
                                <option value="MALE">Male</option>
                            </Select>
                            {((formik.touched.roomie_gender && formik.errors.roomie_gender) &&<ErrorAlert>{formik.errors.roomie_gender}</ErrorAlert>)}
                        </div>

                        <div className={styles.inputGroup}>
                            <Label name="state">Age Range</Label>
                            <Select name="roomie_age" {...formik.getFieldProps('roomie_age')}>
                                <option>{"< 16"}</option>
                                <option>16 - 20</option>
                                <option>21 - 25</option>
                                <option>25 - 30</option>
                                <option>{"> 30"}</option>
                            </Select>
                            {((formik.touched.roomie_age && formik.errors.roomie_age) &&<ErrorAlert>{formik.errors.roomie_age}</ErrorAlert>)}
                        </div>

                        <div className={styles.inputGroup}>
                            <Label name="roomie_religion">Religion</Label>
                            <Select name="roomie_religion" {...formik.getFieldProps('roomie_religion')}>
                                <option value="CHRISTIANITY">Christianity</option>
                                <option value="ISLAM">Islam</option>
                                <option value="OTHER">Other</option>
                            </Select>
                            {((formik.touched.roomie_religion && formik.errors.roomie_religion) &&<ErrorAlert>{formik.errors.roomie_religion}</ErrorAlert>)}
                        </div>

                        <div className={styles.inputGroup}>
                            <Label name="roomie_personality">Personality</Label>
                            <Select name="roomie_personality" {...formik.getFieldProps('roomie_personality')}>
                                <option value="INTROVERT">Introvert</option>
                                <option value="EXTROVERT">Extrovert</option>
                            </Select>
                            {((formik.touched.roomie_personality && formik.errors.roomie_personality) &&<ErrorAlert>{formik.errors.roomie_personality}</ErrorAlert>)}
                        </div>


                        <div className={styles.inputGroup}>
                            <Label name="roomate_description">Define roommate in words</Label>
                            <Textarea 
                                name="roomate_description"
                                {...formik.getFieldProps('roomate_description')}
                                placeholder="E.g  I am a church girl and I love playing music out loud. 
                                Do not consider becoming my roommate if you hate loud music.">
                            </Textarea>
                            {((formik.touched.roomate_description && formik.errors.roomate_description) &&<ErrorAlert>{formik.errors.roomate_description}</ErrorAlert>)}
                        </div>
                    </div>

                    <Button className={isLoading ? "isLoading" : ""} type="submit">{isLoading ? "Loading..." : "Save changes"} </Button>
                
                </div>
                </form>

                )}
            </Formik>
        </div>
        {isSuccess && <div className={styles.successMessage}>Ideal Roommate updated successfully</div>}
    </SingleConnectionReceivedTemplate>
     );
}
 
export default IdealRoommateTemplate;