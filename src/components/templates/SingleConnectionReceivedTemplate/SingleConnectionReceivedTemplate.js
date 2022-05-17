import Header from '../../ui/organisms/Header/Header';
import styles from './SingleConnectionReceivedTemplate.module.css';

const SingleConnectionReceivedTemplate = ({children}) => 
{
    return ( 
        <div className={styles.expandedDashboardContainer}> 
        <Header
            customStyle={{backgroundColor: "#F5F7FF"}}
        />

            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    {children}                
                </div> 
            </div>
           
        </div>
     );
}
 
export default SingleConnectionReceivedTemplate;