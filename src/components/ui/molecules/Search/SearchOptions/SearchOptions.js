import Select from "../../../atoms/Select/Select";
import styles from './SearchOptions.module.css';
const SearchOptions = ({filters, showSelectTagsOnExplorePage}) => {

    const showSelectTags = (data) => 
    {
        showSelectTagsOnExplorePage(data);
    }

return (

        <div className={styles.searchOptions}>
            {
                filters.map((filter) => 
                {
                    return  (
                        <div key={filter.key} className={styles.searchSelect}>
                            <Select
                                showSelectTags={showSelectTags} 
                                name={filter.name}
                                label={filter.label}
                            >
                                {filter.data.map((option) => 
                                {
                                    return <option key={option.key} value={option.value}>{option.label}</option>
                                })}
                            </Select>
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default SearchOptions;