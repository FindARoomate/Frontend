import styles from './SearchTag.module.css';

const SearchTag = ({children}) => {
    return ( 
        <div className={styles.searchTag}>
            {children}
        </div>
     );
}
 
export default SearchTag;