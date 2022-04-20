import styles from './SearchBar.module.css';
import Input from '../../../atoms/Input/Input';

const SearchBar = ({placeholder}) => {
    return ( 
        <div className={styles.searchBar}>
            <Input
                type="text"
                placeholder={placeholder}
            />
        </div>
     );
}
 
export default SearchBar;