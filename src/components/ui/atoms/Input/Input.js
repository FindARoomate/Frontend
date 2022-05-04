import styles from './Input.module.css';

const Input = (props) => 
{
    const {handleFormInputChange, name, ...rest} = props;

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
            {...rest}
            name={name}
        />
     );
}
 
export default Input;