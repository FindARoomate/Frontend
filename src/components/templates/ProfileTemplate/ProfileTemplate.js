import SingleConnectionReceivedTemplate from "../SingleConnectionReceivedTemplate/SingleConnectionReceivedTemplate";
import addImageIcon from './../../../icons/add-image-icon.svg';
import Textarea from "../../ui/atoms/Textarea/Textarea";
import dp from './../../../images/dashboard-image.png';
import editIcon from './../../../icons/edit-icon.svg';
import backIcon from './../../../icons/back-icon.svg';
import styles from './ProfileTemplate.module.css';
import Button from "../../ui/atoms/Button/Button";
import Select from "../../ui/atoms/Select/Select";
import Input from "../../ui/atoms/Input/Input";
import Img from './../../ui/atoms/Img/Img';
import { useState } from "react";


const ProfileTemplate = ({profile = null}) => 
{
    const [isCurrentlyEditting, setIsCurrentlyEditting] = useState(false);

    const handleUpdateProfile = (e) => 
    {
        e.preventDefault();
        console.log(e.target);
    }

    return ( 
        <SingleConnectionReceivedTemplate>
             <div className={styles.backNavigation} onClick={() => window.history.back()}>
                    <Img src={backIcon} />
                    <span>Back</span>
                </div>

                
                <div className={styles.profileInfoContainer}>
                    {
                        !isCurrentlyEditting &&
                        <div>
                            <Button type="button" className={styles.editButton} handleOnClick={() => setIsCurrentlyEditting(true)}>Edit Profile</Button>
                        </div>
                    }
                <form onSubmit={handleUpdateProfile}>
                <div className={styles.profileImageRow}>
                    <div className={styles.profileImageContainer}>
                        <span className={styles.profileImage}>
                            <Img src={profile ? profile.data.image_url : dp}/>
                        </span>
                        <span className={styles.addProfileImageIcon}>
                            <Img src={addImageIcon}/>
                        </span>
                    </div>
                </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Name</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.data.fullname : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Input defaultValue={profile ? profile.data.fullname : ""} type="text" required/>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Phone number</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.data.phone_number : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Input defaultValue={profile ? profile.data.phone_number : ""} type="text" required/>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Email</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.email : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Input defaultValue={profile ? profile.email : ""} type="email" required/>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Gender</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile.data.gender.toLowerCase() : "Loading..."}
                                </span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Select name="gender" defaultValue= {profile ? profile.data.gender : ""}>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </Select>                           
                            }
                            
                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Profession</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.data.profession : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Input defaultValue={profile ? profile.data.profession : ""} type="text" required/>
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Age range</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.data.age_range : "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Select name="age_range" defaultValue={profile ? profile.data.age_range : ""}>
                                    <option>{"< 16"}</option>
                                    <option>16 - 20</option>
                                    <option>21 - 25</option>
                                    <option>25 - 30</option>
                                    <option>{"> 30"}</option>
                                </Select>                            
                            }
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Religion</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile.data.religion.toLowerCase() : "Loading..."}
                                </span>                            }
                            {
                                isCurrentlyEditting &&
                                <Select name="religion" defaultValue={profile ? profile.data.religion : ""}>
                                    <option value="CHRISTIANITY">Christianity</option>
                                    <option value="ISLAM">Islam</option>
                                    <option value="OTHER">Other</option>
                                </Select>                            
                            }
                            
                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Personality</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value} style={{textTransform: "capitalize"}}>
                                    {profile ? profile.data.personality.toLowerCase() : "Loading..."}
                                </span>                            
                            }
                            {
                                isCurrentlyEditting &&
                                <Select name="personality" defaultValue={profile ? profile.data.personality : ""}>
                                    <option value="INTROVERT">Introvert</option>
                                    <option value="EXTROVERT">Extrovert</option>
                                </Select>                            
                            }                            
                        </div>
                    </div>
                    <div className={styles.profileInfoRow}>
                        <div className={styles.profileInfo}>
                            <span className={styles.label}>Short Bio</span>
                            {
                                !isCurrentlyEditting &&
                                <span className={styles.value}>{profile ? profile.data.bio: "Loading..."}</span>
                            }
                            {
                                isCurrentlyEditting &&
                                <Textarea 
                                    name="bio"
                                    defaultValue={profile ? profile.data.bio : ""}
                                    placeholder="E.g  I am a church girl and I love playing music out loud. 
                                    Do not consider becoming my roommate if you hate loud music.">
                                </Textarea> 
                            }
                            
                        </div>
                    </div>
                    {
                        isCurrentlyEditting &&
                        <div>
                            <Button className={styles.updateButton}>Update</Button>
                        </div>
                    }
                    </form>
                </div>
        </SingleConnectionReceivedTemplate>
     );
}
 
export default ProfileTemplate;