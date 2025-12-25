import db from "../config/db.js";

const AboutModel = {
    // 獲取公司簡介（獲取最新的一筆記錄）
    get: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT id, about as content, updated_at FROM fu_about ORDER BY id DESC LIMIT 1',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0] || null);
                }
            );
        });
    },

    // 更新公司簡介
    update: (id, content) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE fu_about SET about = ? WHERE id = ?',
                [content, id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 如果沒有記錄，創建初始記錄
    createDefault: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO fu_about (about) VALUES (?)',
                ['請輸入公司簡介內容...'],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

export default AboutModel;
