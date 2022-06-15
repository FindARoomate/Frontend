import { useEffect, useState } from 'react';
import Img from './../../../atoms/Img/Img';
import { Navigate, Link } from 'react-router-dom';
import styles from './SearchBar.module.css';
import Input from '../../../atoms/Input/Input';
import searchIcon from './../../../../../icons/search-icon.svg';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({placeholder}) => 
{
    const navigate = useNavigate();
    const [searchUrl, setSearchUrl] = useState("");

    const handleOnChange = (e) => 
    {
        e.preventDefault();
        if(e.target.value)
        {
            setSearchUrl("?city="+e.target.value);
        }
    }

    return ( 
        <form className={styles.searchBar} onSubmit={(e) => {e.preventDefault(); navigate(searchUrl)}}>
            <Input
                type="text"
                placeholder={placeholder}
                onChange={handleOnChange}
                name="search"
            />
            <Img src={searchIcon} onClick={() => navigate(searchUrl)}/>
        </form>
       
     );
}
 
export default SearchBar;