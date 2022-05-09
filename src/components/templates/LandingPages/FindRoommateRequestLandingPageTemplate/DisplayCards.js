import P from "../../../ui/atoms/P/P";
import Card from "../../../ui/organisms/Card/Card";
import styles from './DisplayCards.module.css';
import dp from './../../../../images/card-display-picture.jpg';

const DisplayCards = ({data, pagination}) => 
{
    const sliderImages = [dp, dp, dp, dp];
    return ( 
        <div className={styles.displayCardContainer}>
            <div className={styles.topSection}>
                <P>{data.length + " results"}</P>
            </div>
            <div className={styles.displayCardBody}>
                <div className={styles.displayCards}>
                {
                    data.map((singleData) => 
                    {
                        return (
                        <Card 
                            key={singleData.id}
                            title={singleData.listing_title}
                            ownerName="Precious Faseyosan"
                            moreInfoLink={"/roommate-request/"+singleData.id}
                            sliderImages = {sliderImages}
                            thumbnail = {dp}
                        />)
                    })
                }
                </div>
                {pagination && (
                     <div className={styles.bottom}>
                     <P>Pagination should be here</P>
                 </div>
                )}
               
            </div>
             
        </div>
       
     );
}
 
export default DisplayCards;