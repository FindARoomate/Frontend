import SearchTag from "../SearchTag/SearchTag";
import styles from "./DisplaySearchTags.module.css";

const DisplaySearchTags = ({tags}) => 
{
    return ( 
        <div className={styles.displaySearchTags}>
             {
                tags.map((tag) => {
                    return (<SearchTag key={tag}>{tag}</SearchTag>);
                })
            }
        </div>
     );
}
 
export default DisplaySearchTags;