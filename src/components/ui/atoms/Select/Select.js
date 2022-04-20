import styles from './Select.module.css';

const Select = ({data}) => {
    return ( 
            <select className={styles.select}>
            <option defaultValue value="0">{data.name}</option>
            {data.values.map((value) => {
                return (<option key={value}>{value}</option>);
            })}
            </select>
     );
}
 
export default Select;