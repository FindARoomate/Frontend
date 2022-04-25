import styles from './Textarea.module.css';


const Textarea = ({rows, columns, customStyle, placeholder,defaultValue, children}) => {
    return ( 
        <textarea 
            className={styles.textarea}
            rows={rows}
            columns = {columns}
            style = {customStyle ? customStyle : {}}
            defaultValue = {defaultValue ? defaultValue : ""}
            placeholder = {placeholder ? placeholder : ""}
            >
               {children}
        </textarea>
     );
}
 
export default Textarea;