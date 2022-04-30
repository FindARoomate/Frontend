import styles from './CreateRoommateRequestTemplate.module.css'
import Header from '../../ui/organisms/Header/Header';
import Textarea from '../../ui/atoms/Textarea/Textarea';
import Select from '../../ui/atoms/Select/Select';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Label from '../../ui/atoms/Label/Label';
import Input from '../../ui/atoms/Input/Input';
import P from '../../ui/atoms/P/P';

const CreateRoommateRequestTemplate = ({inputs, button, navClasses, handleSubmit, description}) => 
{
    const handleFormSubmit = (e) => 
    {
        handleSubmit(e);
    }

    return ( 
        <div className={styles.roommateRequestContainer}>
        <Header/>
        <div className={styles.roommateRequest}>
        <H1>TELL US ABOUT YOUR ROOM</H1>
        <div className={styles.formNavigationContainer}>
            <div className={styles.formNavigation}>
                <div className={`${navClasses[0]} ${styles.singleNav}`}>
                </div>
                <div className={`${navClasses[1]} ${styles.singleNav}`}>
                </div>
                <div className={`${navClasses[2]} ${styles.singleNav}`}>
                </div>
                <div className={`${navClasses[2]} ${styles.singleNav}`}>
                </div>
            </div>
            <div className={styles.description}><P>{description}</P></div>
        </div>
        
        <form onSubmit={handleFormSubmit} className={styles.form}>
            {
                inputs.map((input) => 
                {
                    //if it is an input field.
                    if(input.inputCategory == "input")
                    {
                        return (
                            <div key={input.key} className={styles.formGroup}>
                                <Label>{input.label}</Label>
                                <Input 
                                    placeholder={input.inputPlaceholder}
                                    type={input.inputType}
                                    name={input.inputName}
                                />
                            </div>
                        );
                    }

                    //if it is a select field
                    if(input.inputCategory == "select")
                    {
                        return (
                            <div key={input.key} className={styles.formGroup}>
                                <Label>{input.label}</Label>
                                <Select data={input.data}/>
                            </div>
                        )
                    }

                    //if it is a textarea
                    if(input.inputCategory == "textarea")
                    {
                        return (
                            <div key={input.key} className={styles.formGroup}>
                                <Label>{input.label}</Label>
                                <Textarea
                                    rows="4"
                                    placeholder={input.inputPlaceholder}
                                />
                            </div>
                        )
                    }

                    //if it is a radio input
                    if(input.inputCategory == "radioInput")
                    {
                        return (
                            <div className={styles.formGroup}>
                            <Label>{input.label}</Label>
                            {input.data.map((radio) => 
                                {
                                    return (
                                        <div className={styles.radioInputClass}>
                                            <Input type="radio" name={radio.inputName} value={radio.value}/>
                                            <Label>{radio.label}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        )
                    }
                    
                })
            }

            {/* Submit form button */}
           {button}
        </form>

        </div>       
    </div> 
     );
}
 
export default CreateRoommateRequestTemplate;