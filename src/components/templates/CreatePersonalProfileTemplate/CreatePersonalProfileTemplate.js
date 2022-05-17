import H1 from "./../../ui/atoms/Headings/H1/H1";
import Input from "../../ui/atoms/Input/Input";
import Label from "./../../ui/atoms/Label/Label";
import Header from "../../ui/organisms/Header/Header";
import Select from "./../../ui/atoms/Select/Select";
import Textarea from "./../../ui/atoms/Textarea/Textarea";
import styles from "./CreatePersonalProfileTemplate.module.css";
import {v4 as uuidv4} from 'uuid';
import FileInput from "../../ui/atoms/FileInput/FileInput";

const CreatePersonalProfileTemplate = (
  {
    inputs, 
    previousButton,
    nextButton, 
    navClasses, 
    handleSubmit, 
    handleInputChange = null,
    handleFileInputChange = null
  }) => 
{
 
const handleFormSubmit = (e) => 
{
    handleSubmit(e);
};

const handleFormInputChange = (name, value) => 
{
    if(handleInputChange)
    {
        handleInputChange(name, value);
    }
}

const handleFormChangeForFileInput = (name, value) => 
{
  if(handleFileInputChange)
  {
    handleFileInputChange(name, value);
  }
}

  return (
    <div className={styles.personalProfileContainer}>
      <Header />
      <div className={styles.personalProfile}>
        <H1>CREATE PERSONAL PROFILE</H1>
        <div className={styles.formNavigationContainer}>
          <div className={styles.formNavigation}>
            <div className={`${navClasses[0]} ${styles.singleNav}`}>
              <span className={styles.number}>1</span>
              <span className={styles.text}>Biodata</span>
            </div>
            <div className={`${navClasses[1]} ${styles.singleNav}`}>
              <span className={styles.number}>2</span>
              <span className={styles.text}>Tell us about yourself</span>
            </div>
            <div className={`${navClasses[2]} ${styles.singleNav}`}>
              <span className={styles.number}>3</span>
              <span className={styles.text}>Define your ideal roommate</span>
            </div>
          </div>
          <div className={styles.formNavigationDivider}></div>
        </div>
        <form onSubmit={handleFormSubmit} className={styles.form}>


          {
            inputs.map((input) => 
            {
              //if it is an input field.
              if (input.inputCategory == "input") {
                return (
                  <div key={uuidv4()} className={styles.formGroup}>
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

              //if it is a file input field
              if(input.inputCategory == "inputFile")
              {
                return (
                  <div key={uuidv4()} className={styles.formGroup}>
                    <FileInput 
                      name={input.inputName}
                      required = {input.required}
                      handleFormChangeForFileInput = {handleFormChangeForFileInput}
                      fileValue = {input.value}
                      />

                    {/* <Input 
                      placeholder={input.inputPlaceholder}
                      type="file"
                      defaultValue = {input.value ? input.value : ""}
                      handleFormInputChange = {handleFormInputChange}
                      /> */}
                  </div>
                )
              }

              //if it is a select field
              if (input.inputCategory == "select")
              {
                return (
                  <div key={uuidv4()} className={styles.formGroup}>
                    <Label>{input.label}</Label>
                    <Select 
                        defaultOption={input.value ? input.value : ""}
                        data={input.data}
                        name={input.inputName}
                        label={input.label}
                        required = {input.required}
                        handleFormInputChange = {handleFormInputChange}
                      />
                  </div>
                );
              }

              //if it is a textarea
              if (input.inputCategory == "textarea") 
              {
                return (
                  <div key={uuidv4()} className={styles.formGroup}>
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
              if (input.inputCategory == "radioInput")
              {
                return (
                  <div key={uuidv4()} className={styles.formGroup}>
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
            })
          }

          {/* Submit form button */}
          <div className={styles.buttonRow}>
            <div className={styles.prevButton}>{previousButton ? previousButton : ""}</div>
            <div className={styles.nextButton}>{nextButton ? nextButton : ""}</div>  
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePersonalProfileTemplate;
