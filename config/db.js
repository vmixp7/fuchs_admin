import mysql from "mysql2";
import 'dotenv/config';

// 使用連接池來提高穩定性
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    connectTimeout: 20000,     // 20 秒連接超時
    waitForConnections: true,
    queueLimit: 0
});

// 測試連接
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL connection error:", err.message);
        if (err.code === 'ETIMEDOUT') {
            console.error("⚠️  連接超時，請檢查：");
            console.error("   1. MySQL 服務器是否運行");
            console.error("   2. 防火牆是否允許 3306 端口");
            console.error("   3. MySQL 是否允許遠端連接");
        }
        return;
    }
    console.log("✅ MySQL connected!");
    connection.release();
});

// 處理連接錯誤
pool.on('error', (err) => {
    console.error("❌ MySQL pool error:", err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error("⚠️  資料庫連接丟失，將自動重連");
    }
});

export default pool;
