import Img from './../../atoms/Img/Img';
import styles from './HeaderDropdown.module.css';
import pullupIcon from './../../../../icons/pullupIcon.svg';
import dp from './../../../../images/card-display-picture.jpg';
import dropdownIcon from './../../../../icons/dropdownIcon.svg';
import { useState } from 'react';

const HeaderDropdown = () => 
{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleModal = () => 
    {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return ( 
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownButton} onClick={toggleModal}>
                <Img className={styles.profileImage}  src={dp}/>
                <span className={styles.text}>Precious Faseyosan</span>
                {<Img className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.activeIcon : ""}`}  src={dropdownIcon}/>}
            </div>
            <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.active : ""}`} name="dropdownMenu">
                <span>View Dashboard</span>
                <span className={styles.middleMenuItem}>Edit Profile</span>
                <span>Update Ideal Roommate</span>
            </div>
        </div>
     );
}
 
export default HeaderDropdown;