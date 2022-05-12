import SearchTag from "../SearchTag/SearchTag";
import styles from "./DisplaySearchTags.module.css";

const DisplaySearchTags = ({tags, removeSearchTag}) => 
{
    const entries = Object.entries(tags);
    return ( 
        <div className={styles.displaySearchTags}>
             {entries.map((entry) =>{
                    return (
                        <SearchTag key={entry[0]} removeSearchTag={removeSearchTag}>
                            {entry}
                        </SearchTag>
                    );
                 })
            }
        </div>
     );
}
 
export default DisplaySearchTags;