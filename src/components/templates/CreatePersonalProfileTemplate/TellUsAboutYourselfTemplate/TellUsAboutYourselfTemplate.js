import CreatePersonalProfileTemplate from "../CreatePersonalProfileTemplate";
import parentStyles from "../CreatePersonalProfileTemplate.module.css";
import Textarea from './../../../ui/atoms/Textarea/Textarea';
import Label from './../../../ui/atoms/Label/Label';
import Select from './../../../ui/atoms/Select/Select';
import Input from '../../../ui/atoms/Input/Input';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-arrow-icon.svg';
import Img from './../../../ui/atoms/Img/Img';

const TellUsAboutYourselfTemplate = () => 
{
    const religion = {key: 1, name: "Religion", values: ["Christian", "Muslim", "Other"]}
    const personality = {key: 1, name: "Personality", values: ["Introvert", "Extrovert"]}
    const navClasses = [parentStyles.visited, parentStyles.active, parentStyles.notVisited];

    return (
     <CreatePersonalProfileTemplate navClasses={navClasses}>
        <form className={parentStyles.form}>
            <div className={parentStyles.formGroup}>
                <Label>Religion</Label>
                <Select data={religion}/>
            </div>
            <div className={parentStyles.formGroup}>
                <Label>Personality</Label>
                <Select data={personality}/>
            </div>
            <div className={parentStyles.formGroup}>
                <Label>Profession</Label>
                <Input type="text" placeholder="e.g student / web developer / real estate manager" />
            </div>
            <div className={parentStyles.formGroup}>
                <Label>Short bio</Label>
                <Textarea 
                    rows="4"
                    placeholder="E.g  I am a church girl and I love playing music out loud. Do not consider becoming my roommate if you hate loud music."
                >
                </Textarea>
            </div>
            <Button>Next <Img src={icon}/> </Button>
        </form>
    </CreatePersonalProfileTemplate> 
    );
}
 
export default TellUsAboutYourselfTemplate;