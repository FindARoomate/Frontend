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
    const [redirect, setRedirect] = useState(false);

    const handleOnChange = (e) => 
    {
        e.preventDefault();
        // let searchTerm = document.querySelector("input[name='search']").value;
        if(e.target.value)
        {
            setSearchUrl("?listing_title="+e.target.value);
        }
    }

    // const handleSearch = () => 
    // {
    //     let searchTerm = document.querySelector("input[name='search']").value;
    //     if(searchTerm)
    //     {
    //         setSearchUrl("?listing_title="+searchTerm);
    //     }
    // }

    useEffect(() => 
    {
        if(searchUrl) setRedirect(true);

    }, [searchUrl, redirect]);

    return ( 
        <>
        {/* {searchUrl && <Navigate to={searchUrl}/>} */}
         <div className={styles.searchBar}>
            <Input
                type="text"
                placeholder={placeholder}
                onChange={handleOnChange}
                name="search"
                // value={defaultValue
            />
            <Img src={searchIcon} onClick={() => navigate(searchUrl)}/>
        </div>
        </>
       
     );
}
 
export default SearchBar;