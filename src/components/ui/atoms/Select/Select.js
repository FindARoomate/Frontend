import styles from './Select.module.css';
import { useState } from 'react';

const Select = ({data, showSelectTags}) =>
{
    const [customStyles, updateCustomStyle] = useState({})

    const handleSelectChange = (e) => 
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

    return ( 
                <select onChange={(e) => handleSelectChange(e)} className={styles.select} style={customStyles ? customStyles : {}}>
                <option defaultValue value="0">{data.name}</option>
                {data.values.map((value) => {
                    return (<option key={value}>{value}</option>);
                })}
            </select>
     );
}
 
export default Select;