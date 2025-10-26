import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2iuixigi",
    database: "fuchs_db",
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL connected!");
});

export default db;
