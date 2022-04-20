import SearchOptions from '../../molecules/Search/SearchOptions/SearchOptions';
import styles from './ExploreSearch.module.css';

const ExploreSearch = () =>
{

    const filters = 
    [
        {
            key: 1,
            name: "Gender",
            values: ["Male", "Female"]
        },
        {
            key: 2,
            name: "Religion",
            values: ["Male", "Female"]
        },
        {
            key: 3,
            name: "Room type",
            values: ["Male", "Female"]
        },
        {
            key: 4,
            name: "Ethnicity",
            values: ["Male", "Female"]
        },
        {
            key: 5,
            name: "Price",
            values: ["Male", "Female"]
        }
    ]

    return ( 
        <div className={styles.exploreSearch}>
            <p className={styles.queryTitle}>Sort By</p>
            <SearchOptions filters={filters}/>
        </div>
     );
}
 
export default ExploreSearch;