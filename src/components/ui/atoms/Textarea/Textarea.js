import styles from './Textarea.module.css';


const Textarea = (props) => {

    const {children, ...rest} = props

    return ( 
        <textarea 
            className={styles.textarea}
            {...rest}
            >
                {children}
            </textarea>
     );
}
 
export default Textarea;