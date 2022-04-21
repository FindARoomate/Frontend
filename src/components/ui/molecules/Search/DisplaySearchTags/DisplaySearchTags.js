import SearchTag from "../SearchTag/SearchTag";
import styles from "./DisplaySearchTags.module.css";

const DisplaySearchTags = ({tags}) => 
{
    const entries = Object.entries(tags);
    return ( 
        <div className={styles.displaySearchTags}>
             {entries.map((entry) =>{
                    return (<SearchTag key={entry[0]}>{entry[1]}</SearchTag>);
                 })
            }
        </div>
     );
}
 
export default DisplaySearchTags;