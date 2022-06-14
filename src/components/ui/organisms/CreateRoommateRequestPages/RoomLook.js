import Img from "../../atoms/Img/Img";
import Input from "../../atoms/Input/Input";
import Label from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import Textarea from "../../atoms/Textarea/Textarea";
import FileInput from "../../atoms/FileInput/FileInput";
import checkIcon from  './../../../../icons/check-icon.svg';
import ErrorAlert from "../../molecules/Alerts/ErrorAlert/ErrorAlert";

const RoomLook = ({formik, styles, nextButtonClicked, moveToPreviousFormGroup, isLoading}) => 
{
    return ( 
        <>
             <div className={styles.inputGroup}>
                    <Label>Please add at least four pictures of different parts of your room e.g bedroom, kitchen, bathroom, balcony, etc. </Label>
                    <FileInput
                        name="request_images"
                        multiple
                        onChange={(name, value) => {formik.setFieldValue(name, value)}}
                        onBlur={formik.handleBlur}
                    />
                    {!nextButtonClicked && ((formik.touched.request_images && formik.errors.request_images) &&<ErrorAlert>{formik.errors.request_images}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.request_images && <ErrorAlert>{formik.errors.request_images}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="listing_title">Add a suitable title for your room listing</Label>
                    <Input  name="listing_title" type="text" placeholder="E.g Bedroom flat in Bodija, Ibadan." {...formik.getFieldProps('listing_title')}/>
                    {!nextButtonClicked && ((formik.touched.listing_title && formik.errors.listing_title) &&<ErrorAlert>{formik.errors.listing_title}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.listing_title && <ErrorAlert>{formik.errors.listing_title}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_information">Are there additional information</Label>
                    <Textarea 
                        name="additional_information"
                        {...formik.getFieldProps('additional_information')}
                        placeholder="I have lived in this room for two years and have had no issues whatever. This is a good choice for you, if you ask me.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.additional_information && formik.errors.additional_information) &&<ErrorAlert>{formik.errors.additional_information}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.additional_information && <ErrorAlert>{formik.errors.additional_information}</ErrorAlert>)}
                </div>

                <div className={styles.buttonGroup}>
                    <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(4)}>Previous</Button>
                    <Button className={`${styles.submitButton} ${isLoading ? "isLoading": ""}`} type="submit" >
                        {isLoading ? "Loading..." : 
                        <>
                            <Img src={checkIcon} customStyle={{margin: "auto 6px auto 0"}}/> Done 
                        </>}
                    </Button>
                </div>
        </>
     );
}
 
export default RoomLook;