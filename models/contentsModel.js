import db from "../config/db.js";

const ContentsModel = {
    // 獲取所有內容
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM lk_contents ORDER BY id ASC',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

export default ContentsModel;
