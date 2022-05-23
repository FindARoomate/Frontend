 export const saveToIDB = (db, tableName, data) => 
 {
    //save to IndexDB
    let openRequest = indexedDB.open(db);

    //If the client has no database yet
    openRequest.onupgradeneeded = () => 
    {
        let db = openRequest.result;
        db.createObjectStore(tableName); //creating the "objectStore" (table) with name of tableName
    }

    //If the database opened successfully
    openRequest.onsuccess = () => 
    {
        let db = openRequest.result;
        let transaction = db.transaction(tableName, "readwrite");
        let files = transaction.objectStore(tableName);

        let request = files.put(data.value, data.name);

        request.onsuccess = () => 
        {
            console.log("File stored");
        }

        request.onerror = () => 
        {
            console.log("Error", request.error);
        }
    }

    //If there is an error with opening database.
    openRequest.onerror = () => 
    {
        console.log("Error", openRequest.error);
    }
 }


 export const removeImageFromIDB = (db, tableName, key) => 
    {
        
        let openRequest = indexedDB.open(db);

        openRequest.onupgradeneeded = () => 
        {
            let db = openRequest.result;
            db.createObjectStore(tableName);
        }

        openRequest.onsuccess = () => 
        {
            let db = openRequest.result;
            let transaction = db.transaction(tableName, "readwrite");
            let files = transaction.objectStore(tableName);
            let data = files.delete(key);

            data.onsuccess = () => 
            {
                console.log("File(s) deleted");
            }

            data.onerror = () => 
            {
                console.log("Error", data.error);
            }
        }

        openRequest.onerror = () => 
        {
            console.log("Error", openRequest.error)
        }
        
    }
