import db from "../config/db.js";

const HikingTypeModel = {
    // 獲取所有登山類型
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM lk_hiking_type ORDER BY id ASC',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

export default HikingTypeModel;
