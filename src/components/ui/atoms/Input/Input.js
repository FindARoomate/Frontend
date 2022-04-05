import styles from './Input.module.css';

const Input = ({placeholder, required, type, min=null, max=null, style = null}) => 
{
    return ( 
        <input
        type={type}
        required = {required ? 'required' : null}
        min = {min}
        max = {max}
        placeholder = {placeholder}
        style = {styles.input}
        />
     );
}
 
export default Input;