import db from "../config/db.js";

const ActivityModel = {
    // 獲取活動列表（分頁）
    getByPage: (page = 1, limit = 6) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢資料
            db.query(
                'SELECT * FROM lk_activity ORDER BY id DESC LIMIT ? OFFSET ?',
                [limit, offset],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // 查詢總數
                    db.query(
                        'SELECT COUNT(*) as total FROM lk_activity WHERE type = 2',
                        (countErr, countResults) => {
                            if (countErr) {
                                reject(countErr);
                                return;
                            }

                            resolve({
                                data: results,
                                total: countResults[0].total,
                                page: parseInt(page),
                                limit: parseInt(limit),
                                totalPages: Math.ceil(countResults[0].total / limit)
                            });
                        }
                    );
                }
            );
        });
    }
};

export default ActivityModel;
