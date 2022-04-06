import styles from './FormGroup.module.css'
import P from '../../atoms/P/P';
import Button from '../../atoms/Button/Button';
import GetInputs from './GetInputs';
/* 
* Gets one paragraph field (serves as a heading for the group), one button field and multiple inputs fields as props
* Returns a form group with 1 heading, several input fields and a button field.
*/
const FormGroup = ({inputs, p, button, handleSubmit, isLoading}) => 
{

    const handleFormSubmit = (e) => 
    {
        handleSubmit(e);
    }

    return ( 
        <div
            className={styles.formGroup}
        >
            {/* Heading text */}
            <P 
                customStyle = {p.customStyle && p.customStyle}
                type = {p.type && p.type}
            >
                {p.content}
            </P>

            <form
                className={isLoading && styles.isLoading}
                onSubmit = {(e) => handleFormSubmit(e)}
            >
                <GetInputs inputs={inputs} />
                <Button>
                    <span>{isLoading ? "Loading ..." : button.content}</span>
                </Button>
            </form>

        </div>
     );
}
 
export default FormGroup;