import SingleConnectionReceivedTemplate from "../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate";
import addImageIcon from './../../../icons/add-image-icon.svg';
import dp from './../../../images/dashboard-image.png';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import styles from './ProfileTemplate.module.css';
import Img from './../../ui/atoms/Img/Img';

const ProfileTemplate = ({data = null}) => {
    return ( 
        <SingleConnectionReceivedTemplate>
             <div className={styles.backNavigation} onClick={() => window.history.back()}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>

                
                <div className={styles.profileInfoContainer}>
                <div className={styles.profileImageRow}>
                    <div className={styles.profileImageContainer}>
                        <span className={styles.profileImage}>
                            <Img src={dp}/>
                        </span>
                        <span className={styles.addProfileImageIcon}>
                            <Img src={addImageIcon}/>
                        </span>
                    </div>
                </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Name</span>
                            <span className={styles.value}>{data ? data.fullname : "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Phone number</span>
                            <span className={styles.value}>{data ? data.phone_number : "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>{data ? data.phone_number : "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Gender</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {data ? data.gender.toLowerCase() : "Loading..."}
                            </span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Profession</span>
                            <span className={styles.value}>{data ? data.profession : "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Age range</span>
                            <span className={styles.value}>{data ? data.age_range : "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Religion</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {data ? data.religion.toLowerCase() : "Loading..."}
                            </span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Personality</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {data ? data.personality.toLowerCase() : "Loading..."}
                            </span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Short Bio</span>
                            <span className={styles.value}>{data ? data.bio: "Loading..."}</span>
                        </div>
                        <div className={styles.editIcon}>
                            <Img src={editIcon}/>
                        </div>
                    </div>
                </div>
        </SingleConnectionReceivedTemplate>
     );
}
 
export default ProfileTemplate;