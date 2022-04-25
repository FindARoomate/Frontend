import styles from './Input.module.css';

const Input = (props) => 
{
    return ( 
        <input
        style = {styles.input}
        {...props}
        />
     );
}
 
export default Input;