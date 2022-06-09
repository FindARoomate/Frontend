import Img from './../../atoms/Img/Img';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from './../../../context';
import styles from './HeaderDropdown.module.css';
import dp from './../../../../images/card-display-picture.jpg';
import dropdownIcon from './../../../../icons/dropdownIcon.svg';


const HeaderDropdown = () => 
{
    // Getting user name from context
    const {userProfile} = useContext(UserContext);


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleModal = () => 
    {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return ( 
        <div className={styles.dropdownContainer}>
            <div className={`${styles.dropdownButton} ${isDropdownOpen ? styles.whiteBg : styles.transparentBg}`} onClick={toggleModal}>
                <Img className={styles.profileImage}  src={userProfile.image_url ? userProfile.image_url : dp}/>
                <span className={styles.text}>{userProfile.fullname}</span>
                {<Img className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.activeIcon : ""}`}  src={dropdownIcon}/>}
            </div>
            <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.active : ""}`} name="dropdownMenu">
                <Link to="/dashboard">View Dashboard</Link>
                <Link to="/profile" className={styles.middleMenuItem}>Edit Profile</Link>
                <Link to="/">Update Ideal Roommate</Link>
            </div>
        </div>
     );
}
 
export default HeaderDropdown;