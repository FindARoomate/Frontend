import Img from './../../../atoms/Img/Img';
import styles from './SearchBar.module.css';
import Input from '../../../atoms/Input/Input';
import searchIcon from './../../../../../icons/search-icon.svg';

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
            <Img src={searchIcon}/>
        </div>
     );
}
 
export default SearchBar;