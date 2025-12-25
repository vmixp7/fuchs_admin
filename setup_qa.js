import mysql from "mysql2/promise";
import 'dotenv/config';

async function setupQaTable() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        console.log("✅ MySQL connected!");

        // 檢查資料表是否存在
        const [tables] = await connection.query(
            "SHOW TABLES LIKE 'fu_qa'"
        );

        if (tables.length > 0) {
            console.log("⚠️  fu_qa 資料表已存在");
        } else {
            // 創建資料表
            await connection.query(`
                CREATE TABLE fu_qa (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    que TEXT NOT NULL COMMENT '問題',
                    ans TEXT NOT NULL COMMENT '答案',
                    num INT DEFAULT 0 COMMENT '排序編號',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            `);
            console.log("✅ fu_qa 資料表創建成功！");
        }

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("❌ 錯誤:", error);
        if (connection) await connection.end();
        process.exit(1);
    }
}

setupQaTable();
