import styles from './Input.module.css';

const Input = (props) => 
{
    const {handleFormInputChange, name, type, placeholder, ...rest} = props;

    const handleInputChange = (e) =>
    {
        if(handleFormInputChange)
        {
            var value = e.target.value;
            handleFormInputChange(name, value);
        }
    }


    return ( 
        <input
            style = {styles.input}
            onChange = {handleInputChange}
            type={type}
            name={name}
            placeholder={placeholder}
            {...rest}
        />
     );
}
 
export default Input;