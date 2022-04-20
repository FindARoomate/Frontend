import Input from '../../../atoms/Input/Input';
import styles from './SearchButton.module.css';
import Button from '../../../atoms/Button/Button';

const SearchButton = ({placeholder}) => {
    return ( 
        <div className={styles.searchButton}>
            <Input
                type="text"
                placeholder={placeholder}
            />
            <Button
                customStyle={{}}
            >Search</Button>
        </div>
     );
}
 
export default SearchButton;