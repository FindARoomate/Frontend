import CreatePersonalProfileTemplate from "../CreatePersonalProfileTemplate";
import parentStyles from "../CreatePersonalProfileTemplate.module.css";
import Label from './../../../ui/atoms/Label/Label';
import Input from '../../../ui/atoms/Input/Input';
import Button from './../../../ui/atoms/Button/Button';
import icon from './../../../../icons/right-tick-icon.svg';
import Img from './../../../ui/atoms/Img/Img';
import P from './../../../ui/atoms/P/P';
import styles from './DefineIdealRoommateTemplate.module.css';

const DefineIdealRommateTemplate = () => 
{
    const navClasses = [parentStyles.visited, parentStyles.visited, parentStyles.active];

    return ( 
        <div className={styles.idealRoommateForm}>
        <CreatePersonalProfileTemplate navClasses={navClasses}>
            <form className={`${parentStyles.form}`}>
                <P className={styles.instruction}>Kindly choose an option for the following: </P>

                <div className={parentStyles.formGroup}>
                    <Label>I need a ________ roommate</Label>
                    {/* Radio Options */}
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Male"/>
                        <Label>Male</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Female"/>
                        <Label>Female</Label>
                    </div>
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>I would like my roommate to be a</Label>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Christian"/>
                        <Label>Christian</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Muslim"/>
                        <Label>Muslim</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="I don't mind"/>
                        <Label>I don't mind</Label>
                    </div>
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>I would like my roommate to be an</Label>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Introvert"/>
                        <Label>Introvert</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="Extrovert"/>
                        <Label>Extrovert</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="I don't mind"/>
                        <Label>I don't mind</Label>
                    </div>       
                </div>
                <div className={parentStyles.formGroup}>
                    <Label>My roommate should be of this age range</Label>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="< 16"/>
                        <Label>{"< 16"}</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="16 - 20"/>
                        <Label>16 - 20</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="21 - 25"/>
                        <Label>21 - 25</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="25 - 30"/>
                        <Label>25 - 30</Label>
                    </div>
                    <div className={parentStyles.radioInputClass}>
                        <Input type="radio" value="> 30"/>
                        <Label>{"> 30"}</Label>
                    </div>                
                </div>
                <Button><Img src={icon}/> Done</Button>
            </form>
        </CreatePersonalProfileTemplate> 
        </div>
      
     );
}
 
export default DefineIdealRommateTemplate;