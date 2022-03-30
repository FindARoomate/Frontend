import FormGroup from '../../molecules/FormGroup/FormGroup';
import styles from './ComingSoonPageForm.modules.css';

const ComingSoonPageForm = () => {

    const inputs = 
    [
        {
            "key": 1,
            "type": "email",
            "placeholder": "E-mail",
        }
    ];

    const p = 
    {
        "content": "Get notified when this website goes live",
        "customStyle": {color:"#7D7D7D"}
    }

    const button = 
    {
        "content": "Notify Me"
    }

    return ( 

        <div
            className={styles.ComingSoonPageForm}
        >
            <FormGroup 
                inputs={inputs} 
                p = {p}
                button = {button}
            />
            
        </div>
        
     );
}
 
export default ComingSoonPageForm;