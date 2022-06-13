import SingleConnectionReceivedTemplate from '../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate';
import backIcon from './../../../icons/back-icon.svg';
import styles from './GuestProfileTemplate.module.css';
import Img from '../../ui/atoms/Img/Img';


const GuestProfileTemplate = ({profile})=> 
{
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
                        {profile && <Img src={profile.image_url}/>}
                    </span>
                </div>
            </div>
            <div className={styles.profileInfoRow}>
                <div className={styles.profileInfo}>
                    <span className={styles.label}>Name</span>
                    <span className={styles.value}>{profile ? profile.fullname : "Loading..."}</span>
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Gender</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {profile ? profile?.gender?.toLowerCase() : "Loading..."}
                            </span>
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Profession</span>
                            <span className={styles.value}>{profile ? profile.profession : "Loading..."}</span>
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Age range</span>
                            <span className={styles.value}>{profile ? profile.age_range : "Loading..."}</span>
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Religion</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {profile ? profile?.religion?.toLowerCase() : "Loading..."}
                            </span>                           
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Personality</span>
                            <span className={styles.value} style={{textTransform: "capitalize"}}>
                                {profile ? profile?.personality?.toLowerCase() : "Loading..."}
                            </span>                            
                    </div>
                </div>
                <div className={styles.profileInfoRow}>
                    <div className={styles.profileInfo}>
                        <span className={styles.label}>Short Bio</span>
                            <span className={styles.value}>{profile ? profile.bio: "Loading..."}</span>
                    </div>
                </div>
        </div>
   </SingleConnectionReceivedTemplate>
     );
}
 
export default GuestProfileTemplate;