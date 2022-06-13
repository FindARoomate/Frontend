import { Field } from 'formik';
import Img from "../../atoms/Img/Img";
import Input from '../../atoms/Input/Input';
import Label from "../../atoms/Label/Label";
import { useState, useEffect } from "react";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";
import nextIcon from './../../../../icons/right-arrow-icon.svg';
import ErrorAlert from "../../molecules/Alerts/ErrorAlert/ErrorAlert";

const RoomDetails = ({formik, error, styles, nextButtonClicked, moveToPreviousFormGroup, moveToNextFormGroup}) => 
{
    return ( 
        <>
         <div className={styles.inputGroup}>
                    <Label name="room_type">Room Type</Label>
                    <Select name="room_type" {...formik.getFieldProps('room_type')}>
                        <option value="">Select a Room Type</option>
                        <option>Self Contain</option>
                        <option>2 Bedroom Flat</option>
                        <option>3 Bedroom Flat</option>
                        <option>Shortlet</option>
                        <option>Single Room Apartment</option>
                    </Select>
                    {!nextButtonClicked && ((formik.touched.room_type && formik.errors.room_type) &&<ErrorAlert>{formik.errors.room_type}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.room_type && <ErrorAlert>{formik.errors.room_type}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_persons">No of persons to occupy the apartment</Label>
                    <Input  name="no_of_persons" placeholder="Please type in the total number of occupants in your room" type="text" {...formik.getFieldProps('no_of_persons')}/>
                    {!nextButtonClicked && ((formik.touched.no_of_persons && formik.errors.no_of_persons) &&<ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.no_of_persons && <ErrorAlert>{formik.errors.no_of_persons}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_current_roomies">No of current roommates/flatmates</Label>
                    <Input  name="no_of_current_roomies" placeholder="Please type in the number of roommates you currently have" type="text" {...formik.getFieldProps('no_of_current_roomies')}/>
                    {!nextButtonClicked && ((formik.touched.no_of_current_roomies && formik.errors.no_of_current_roomies) &&<ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.no_of_current_roomies && <ErrorAlert>{formik.errors.no_of_current_roomies}</ErrorAlert>)}
                </div>

                <div className={styles.inputGroup}>
                    <Label name="no_of_current_roomies"><b>Amenities:</b> Kindly select all that applies</Label>
                    <div className={styles.checkboxContainer}>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Personal bathroom"/>
                            <Label>Personal bathroom</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Washing Machine"/>
                            <Label>Washing Machine</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Wifi"/>
                            <Label>Wifi</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Solar Inverter"/>
                            <Label>Solar Inverter</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Balcony"/>
                            <Label>Balcony</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Cooker"/>
                            <Label>Cooker</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value={"Reading table & chair"}/>
                            <Label>{"Reading table & chair"}</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Basketball court"/>
                            <Label>Basketball court</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Refrigirator"/>
                            <Label>Refrigirator</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Air Condition"/>
                            <Label>Air Condition</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Home theatre"/>
                            <Label>Home theatre</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Gym"/>
                            <Label>Gym</Label>
                        </span>
                        <span className={styles.checkboxInputClass}>
                            <Field type="checkbox" name="amenities" value="Other"/>
                            <Label>Other</Label>
                        </span>
                    </div>
                    {!nextButtonClicked && ((formik.touched.amenities && formik.errors.amenities) &&<ErrorAlert>{formik.errors.amenities}</ErrorAlert>)}
                    {nextButtonClicked && (formik.errors.amenities && <ErrorAlert>{formik.errors.amenities}</ErrorAlert>)}
                </div>

                <div>
                    <div className={styles.buttonGroup}>
                        <Button type="button" className={`${styles.prevButton}`} onClick={() => moveToPreviousFormGroup(2)}>Previous</Button>
                        <Button type="button" className={`${styles.nextButton}`} onClick={() => moveToNextFormGroup(2, formik.errors)}>Next <Img src={nextIcon}/></Button>
                    </div>
                    {error && <ErrorAlert>{error}</ErrorAlert>}
                </div>
        </>
     );
}
 
export default RoomDetails;