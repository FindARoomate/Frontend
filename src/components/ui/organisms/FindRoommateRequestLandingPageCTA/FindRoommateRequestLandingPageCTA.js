import P from "../../atoms/P/P";
import H3 from "../../atoms/Headings/H3/H3";
import Button from "../../atoms/Button/Button";
import styles from "./FindRoommateRequestLandingPageCTA.module.css";

const FindRoommateRequestLandingPageCTA = () => {
    return ( 
        <div className={styles.cta}>
            <div>
                <H3>Not here to view roommate requests?</H3>
                <P>If you have your own room and would like to find a roommate for yourself, you can create your own request.</P>
            </div>
            <div className={styles.ctaButton}>
                <Button>Create a roommate request</Button>
            </div>
        </div>
     );
}
 
export default FindRoommateRequestLandingPageCTA;