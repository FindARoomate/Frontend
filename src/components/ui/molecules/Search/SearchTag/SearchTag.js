import styles from './SearchTag.module.css';

const SearchTag = ({children, removeSearchTag}) => 
{
    function removeTag()
    {
        removeSearchTag(children)
    }
    return ( 
        <div className={styles.searchTag}>
            <div>{children[1]}</div>
            <div className={styles.closeIcon}
                onClick={removeTag}
            ></div>
        </div>
     );
}
 
export default SearchTag;