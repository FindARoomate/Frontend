import styles from './Select.module.css';
import { useState } from 'react';

const Select = ({data, defaultOption, showSelectTags}) =>
{
    const [customStyles, updateCustomStyle] = useState({})

    // var defaultSelectOption;

    // if (defaultOption)
    // {
    //     defaultSelectOption = {defaultOption;
    // }
    // else
    // {
    //     defaultSelectOption = "";
    // }
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

    }

    return ( 
                <select 
                    onChange={(e) => handleSelectChange(e)}
                    className={styles.select} 
                    style={customStyles ? customStyles : {}}
                >

                <option defaultValue= {defaultOption ? true : false} value="0" disabled>{data.name}</option>

                {data.values.map((value) => {
                    return (
                    <option 
                        key={value}
                        defaultValue= {defaultOption === value}    
                    >
                        {value}
                    </option>);
                })}
            </select>
     );
}
 
export default Select;