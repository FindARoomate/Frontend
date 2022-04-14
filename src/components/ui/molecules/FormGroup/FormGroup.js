import styles from './FormGroup.module.css'
import P from '../../atoms/P/P';
import Button from '../../atoms/Button/Button';
import GetInputs from './GetInputs';
import GetTextareas from './GetTextareas';
/* 
* Gets one paragraph field (serves as a heading for the group), one button field and multiple inputs fields as props
* Returns a form group with 1 heading, several input fields and a button field.
*/
const FormGroup = ({inputs, textareas, p, button, handleSubmit, isLoading}) => 
{

    const handleFormSubmit = (e) => 
    {
        handleSubmit(e);
    }

    return ( 
        <div className={styles.formGroup}>
            {/* Heading text */}
           {p && (<P customStyle = {p.customStyle && p.customStyle} type = {p.type && p.type}>
                {p.content}
            </P>)}

            <form
                className={isLoading ? styles.isLoading : ''}
                onSubmit = {(e) => handleFormSubmit(e)}
            >
                {/* This way inputs and textareas display, but there is no way to control the order. 
                A better solution will be to have a GetFields component and put all the fields in a single array. 
                We can now have a "type" key. This will determine whether it is an input field, a textarea or a checkbox
                */}

                {inputs && <GetInputs inputs={inputs} />}
                {textareas && <GetTextareas textareas={textareas}/>}

                <Button>
                    <span>{isLoading ? "Loading..." : button.content}</span>
                </Button>
            </form>

        </div>
     );
}
 
export default FormGroup;