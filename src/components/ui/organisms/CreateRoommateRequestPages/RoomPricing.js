import Img from "../../atoms/Img/Img";
import Label from "../../atoms/Label/Label";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Textarea from "../../atoms/Textarea/Textarea";
import nextIcon from './../../../../icons/right-arrow-icon.svg';
import ErrorAlert from "../../molecules/Alerts/ErrorAlert/ErrorAlert";

const RoomPricing = ({formik, error, styles, nextButtonClicked, moveToNextFormGroup, moveToPreviousFormGroup}) =>
{
    return ( 
        <>
                <div className={styles.inputGroup}>
                    <Label name="date_to_move">How soon can your roommate move in?</Label>
                    <Input  name="date_to_move" type="date" placeholder="Select a date" {...formik.getFieldProps('date_to_move')}/>
                    {!nextButtonClicked && ((formik.touched.date_to_move && formik.errors.date_to_move) &&<ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.date_to_move && <ErrorAlert>{formik.errors.date_to_move}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="rent_per_person">Rent per person (in naira)?</Label>
                    <Input  name="rent_per_person" type="text" placeholder="Please enter the rent each person is to pay" {...formik.getFieldProps('rent_per_person')}/>
                    {!nextButtonClicked && ((formik.touched.rent_per_person && formik.errors.rent_per_person) &&<ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.rent_per_person && <ErrorAlert>{formik.errors.rent_per_person}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="additional_cost">Are there additional costs?</Label>
                    <Textarea 
                        name="additional_cost"
                        {...formik.getFieldProps('additional_cost')}
                        placeholder="E.g We pay #5,000 monthly for the gym and #500 to use the washing machine for an hour.">
                    </Textarea>
                    {!nextButtonClicked && ((formik.touched.additional_cost && formik.errors.additional_cost) &&<ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.additional_cost && <ErrorAlert>{formik.errors.additional_cost}</ErrorAlert>)}
                </div>

                <div>
                    <div className={styles.buttonGroup}>
                        <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(3)}>Previous</Button>
                        <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(3, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    </div>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
        </>
     );
}
 
export default RoomPricing;