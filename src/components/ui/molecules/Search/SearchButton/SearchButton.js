import Input from '../../../atoms/Input/Input';
import styles from './SearchButton.module.css';
import Button from '../../../atoms/Button/Button';

const SearchButton = ({placeholder, handleSubmit}) => 
{
    const handleFormSubmit = (e) => 
    {
        if(handleSubmit)
        {
            e.preventDefault();
            handleSubmit(e);
        }
    }
    return ( 
        <div className={styles.searchButton}>
            <form onSubmit={handleFormSubmit}>
                <Input
                    type="text"
                    placeholder={placeholder}
                />
                <Button
                    customStyle={{}}
                >Search</Button>
            </form>
        </div>
     );
}
 
export default SearchButton;