import styles from './FormGroup.modules.css'
import P from '../../atoms/P/P';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

/* 
* Gets one paragraph field (serves as a heading for the group), one button field and multiple inputs fields as props
* Returns a form group with 1 heading, several input fields and a button field.
*/
const FormGroup = ({inputs, p, button}) => 
{

    // const getInputs = () =>
    // {
    //     inputs.map((input) => 
    //     {
    //         console.log(input);
    //         return(<Input key={input.key} type={input.type} placeholder={input.placeholder}/>);
    //     })
    // }

    return ( 
        <div
            className={styles.formGroup}
        >
            {/* Heading text */}
            <P 
                customStyle = {p.customStyle && p.customStyle}
                type = {p.type && p.type}
                align = {p.align && p.align}
            >
                {p.content}
            </P>

            {/* Get all inputs passed in as props */}
            {
                inputs.map((input) => 
                {
                    console.log(input);
                    return(<Input key={input.key} type={input.type} placeholder={input.placeholder}/>);
                })
            }

            {/* Button */}
            <Button>{button.content}</Button>

        </div>
     );
}
 
export default FormGroup;