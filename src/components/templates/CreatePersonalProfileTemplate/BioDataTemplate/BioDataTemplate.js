import CreatePersonalProfileTemplate from "../CreatePersonalProfileTemplate";
import parentStyles from "../CreatePersonalProfileTemplate.module.css";
import Label from './../../../ui/atoms/Label/Label';
import Select from './../../../ui/atoms/Select/Select';
import Input from '../../../ui/atoms/Input/Input';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import Img from './../../../ui/atoms/Img/Img';

const BioDataTemplate = () =>
{
    const gender = {key: 1, name: "Gender", values: ["Male", "Female"]}

    const navClasses = [parentStyles.active, parentStyles.notVisited, parentStyles.notVisited];

    return ( 
        <CreatePersonalProfileTemplate navClasses={navClasses}>
            <form className={parentStyles.form}>
                <div className={parentStyles.formGroup}>
                    <Label>Name</Label>
                    <Input placeholder="Firstname Lastname" type="text" />
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>Email</Label>
                    <Input placeholder="youremail@gmail.com" type="email" />
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>Phone Number</Label>
                    <Input type="number" />
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>Gender</Label>
                    <Select data={gender}/>
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>Date of birth</Label>
                    <Input type="date" />
                </div>
                <Button>Next <Img src={icon}/> </Button>
            </form>
        </CreatePersonalProfileTemplate>
     );
}
 
export default BioDataTemplate;