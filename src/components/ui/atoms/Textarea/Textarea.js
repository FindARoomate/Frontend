import styles from './Textarea.module.css';


const Textarea = (props) => {

    const {children, name, handleFormInputChange, ...rest} = props
    const handleTextAreaChange = (e) => 
    {
        if(handleFormInputChange)
        {
            var value = e.target.value;
            handleFormInputChange(name, value);
        }
    }

    return ( 
        <textarea 
            onChange = {handleTextAreaChange}
            className={styles.textarea}
            {...rest}
            >
                {children}
            </textarea>
     );
}
 
export default Textarea;