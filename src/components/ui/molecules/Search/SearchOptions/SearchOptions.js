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
                                data={filter.data} 
                                showSelectTags={showSelectTags} 
                                name={filter.name}
                                label={filter.label}
                            />
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default SearchOptions;