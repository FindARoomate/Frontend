import { useState, useCallback } from "react";

const useGetFromIDB = () => 
{
    const [IDBData, setIDBData] = useState(null);


    const getIDBData = useCallback((db, tableName, key) => 
    {
        let openRequest = indexedDB.open(db);

        //if the database does not exist
        openRequest.onupgradeneeded = () => 
        {
            let db = openRequest.result;
            db.createObjectStore(tableName);
        }
    
        openRequest.onsuccess = () => 
        {
            let db = openRequest.result;
            let transaction = db.transaction(tableName, "readonly");
            let files = transaction.objectStore(tableName);
            let data = files.get(key);
    
            data.onsuccess = () => 
            {
                setIDBData(data.result);
            }
    
            data.onerror = () => 
            {
                console.log("Error", data.error);
            }
        }   
    },
      []);

      return {IDBData, getIDBData}
  
}
 
export default useGetFromIDB;