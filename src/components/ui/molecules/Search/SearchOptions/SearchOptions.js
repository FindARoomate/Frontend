import Select from "../../../atoms/Select/Select";
import styles from './SearchOptions.module.css';

const SearchOptions = ({filters}) => {
    return (

        <div className={styles.searchOptions}>
            {
                filters.map((filter) => 
                {
                    return  (
                        <div className={styles.searchSelect}>
                            <Select key={filter.key} data={filter}/>
                        </div>
                    )
                })
            }
        </div>
     );
}
 
export default SearchOptions;