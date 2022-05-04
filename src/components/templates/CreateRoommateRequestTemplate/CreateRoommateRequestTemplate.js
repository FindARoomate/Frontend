import styles from './CreateRoommateRequestTemplate.module.css'
import Header from '../../ui/organisms/Header/Header';
import Textarea from '../../ui/atoms/Textarea/Textarea';
import Select from '../../ui/atoms/Select/Select';
import H1 from '../../ui/atoms/Headings/H1/H1';
import Label from '../../ui/atoms/Label/Label';
import Input from '../../ui/atoms/Input/Input';
import P from '../../ui/atoms/P/P';

const CreateRoommateRequestTemplate = (
    {
        inputs, 
        prevButton,
        nextButton, 
        navClasses, 
        handleSubmit, 
        description, 
        handleFormInputChange
    }) => 
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
                <div className={`${navClasses[3]} ${styles.singleNav}`}>
                </div>
            </div>
            <div className={styles.description}><P>{description}</P></div>
        </div>
        
        <form onSubmit={handleFormSubmit} className={styles.form}>
        {
            inputs.map((input) => {
              //if it is an input field.
              if (input.inputCategory == "input") {
                return (
                  <div key={input.key} className={styles.formGroup}>
                    <Label>{input.label}</Label>
                    <Input 
                      placeholder={input.inputPlaceholder}
                      type={input.inputType}
                      name={input.inputName}
                      defaultValue = {input.value ? input.value : ""}
                      required = {input.required}
                      handleFormInputChange = {handleFormInputChange}
                      />
                  </div>
                );
              }

              //if it is a select field
              if (input.inputCategory == "select")
              {
                return (
                  <div key={input.key} className={styles.formGroup}>
                    <Label>{input.label}</Label>
                    <Select 
                        defaultOption={input.value ? input.value : ""}
                        data={input.data}
                        name={input.inputName}
                        required = {input.required}
                        handleFormInputChange = {handleFormInputChange}
                      />
                  </div>
                );
              }

              //if it is a textarea
              if (input.inputCategory == "textarea") {
                return (
                  <div key={input.key} className={styles.formGroup}>
                    <Label>{input.label}</Label>
                    <Textarea
                          rows="4"
                          placeholder={input.inputPlaceholder}
                          name = {input.inputName}
                          required = {input.required}
                          defaultValue = {input.value ? input.value : ""}
                          handleFormInputChange = {handleFormInputChange}
                          />
                  </div>
                );
              }

              //if it is a radio input
              if (input.inputCategory == "radioInput") {
                return (
                  <div key={input.key} className={styles.formGroup}>
                    <Label>{input.label}</Label>
                    {input.data.map((radio) => {
                      return (
                        <div key={radio.key} className={styles.radioInputClass}>
                          <Input
                            type="radio"
                            name={input.inputName}
                            value={radio.value}
                            required = {input.required}
                            defaultChecked = {input.value == radio.value}
                            handleFormInputChange = {handleFormInputChange}
                          />
                          <Label>{radio.label}</Label>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              //if it is a checkbox input 
              if(input.inputCategory == "checkboxInput")
              {
                  return (
                      <div key={input.key} className={styles.formGroup}>
                        <Label>{input.label}</Label>
                        <div className={styles.checkboxContainer}>
                        {
                            input.data.map((checkbox) => 
                            {
                                return (
                                    <div key={checkbox.value} className={styles.checkboxInputClass}>
                                        <Input type="checkbox" name={checkbox.inputName} value={checkbox.value}/>
                                        <Label>{checkbox.label}</Label>
                                    </div>
                                )
                            })
                        }
                        </div>
                        
                  </div>
                  )
              }
                    
                })
            }

            {/* Submit form button */}
            <div className={styles.buttonRow}>
                <div className={styles.prevButton}>{prevButton ? prevButton : ""}</div>
                <div className={styles.nextButton}>{nextButton ? nextButton : ""}</div>  
            </div>
        </form>

        </div>       
    </div> 
     );
}
 
export default CreateRoommateRequestTemplate;