// Importing SQLite3 module 
const sqlite3 = require("sqlite3").verbose();

// Creating database into appropriate directory 
const db = new sqlite3.Database("./src/database/database.db");

// Exporting database variable so it can be used by other scripts
module.exports = db;

// These are left here for reference in managing SQL database
// 
// db.serialize(() => {
// 
//     // 4 SQL commands:
//     // 1) Creating a table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);
//     // 2) Inserting data into the table
//     const query = `
//     INSERT INTO places(
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Residuos eletronicos e lampadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("Successfully registered!");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);
// 
//     // 3) Consulting data from the table
//     // db.all(`SELECT * FROM places`, function(err,rows) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }
//     //     console.log("Here are the registered points:");
//     //     console.log(rows);
//     // });
    

    // 4) Deleting data from table
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("Register successfully deleted!");
    // })

// });