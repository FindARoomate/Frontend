import styles from './Select.module.css';
import { useState } from 'react';

const Select = ({showSelectTags, handleFormInputChange, name, children, ...rest}) =>
{
    const [customStyles, updateCustomStyle] = useState({})

    const handleSelectChange = (e) => 
    {
        if(showSelectTags)
        {
            var tagValue = e.target.value;
            updateCustomStyle({background:"#F5F7FF"});
            if(tagValue != 0)
            {
                var tagInfo = [name, tagValue];
                showSelectTags(tagInfo);
            }
        }

        if(handleFormInputChange)
        {
            handleFormInputChange(name, e.target.value);
        }

    }

    return ( 
                <select 
                    className={styles.select}
                    onChange={(e) => handleSelectChange(e)}
                    style={customStyles ? customStyles : {}}
                    name={name}
                    {...rest}
                >
                    {children}
            </select>
                
     );
}
 
export default Select;