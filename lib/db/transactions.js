import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('jim.db'); // Replace 'yourDatabase.db' with your desired name
export const  storeValues = (tableName, objectData) => {
 // Build the column definitions
 const columnDefinitions = Object.keys(objectData)
   .map(key => `${key} TEXT`) // Assuming all values are text for simplicity
   .join(', ');
 // Build the query with placeholders for values
 const placeholders = Object.keys(objectData).map((key) => `"${objectData[key]}"`).join(', ');
 const query = `
   CREATE TABLE IF NOT EXISTS ${tableName} (
     ${columnDefinitions}
   );
   INSERT INTO ${tableName} (${Object.keys(objectData).join(', ')})
   VALUES (${placeholders})
 `;
 console.log(query);
 db.transaction(tx => {
   tx.executeSql(query, Object.values(objectData),
     () => console.log('Table created and data inserted!'),
     (_, error) => console.error('Error:', error)
   );
 });
}

export const  retrieveValues = (tableName) => {
    return new Promise((resolve, reject) => { // Wrap in a promise for flexibility
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${tableName}`,
          [],
          (_, { rows }) => {
            const formattedResults = rows._array.map(row => {
              const rowObject = {};
              for (let i = 0; i < rows.itemLength; i++) {
                rowObject[rows.fieldName(i)] = row[i];
              }
              return rowObject;
            });
            resolve(formattedResults);
          },
          (_, error) => reject(error) // Reject the promise on error
        );
      });
    });
   }