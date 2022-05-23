import styles from './SearchBar.module.css';
import Input from '../../../atoms/Input/Input';

const SearchBar = ({placeholder, handleOnBlur}) => 
{
    const onBlur = (e) => 
    {
       e.preventDefault();
       
       if(handleOnBlur)
       {
           handleOnBlur(e);
       }
    }

    return ( 
        <div className={styles.searchBar}>
            <Input
                type="text"
                placeholder={placeholder}
                onBlur={onBlur}
            />
        </div>
     );
}
 
export default SearchBar;