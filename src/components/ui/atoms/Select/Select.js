import styles from './Select.module.css';
import { useState } from 'react';

const Select = ({data, defaultOption, showSelectTags, handleFormInputChange, name, label, required}) =>
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
                var selectKey = data.key;
                var tagInfo = [selectKey, tagValue];
                
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
                    onChange={(e) => handleSelectChange(e)}
                    className={styles.select} 
                    style={customStyles ? customStyles : {}}
                    name={name}
                    required = {required}
                    defaultValue = {defaultOption}
                >

                <option value="">{label}</option>

                {data.map((option) => 
                {
                    return (
                    <option key={option.key} value={option.value}>{option.label}</option>);
                })}
            </select>
     );
}
 
export default Select;