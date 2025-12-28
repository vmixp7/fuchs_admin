import db from "../config/db.js";

const HikingModel = {
    // 根據 type_id 獲取登山資料（分頁）
    getByTypeId: (typeId, page = 1, limit = 6) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢資料
            db.query(
                'SELECT * FROM lk_hiking WHERE type_id = ? ORDER BY id DESC LIMIT ? OFFSET ?',
                [typeId, limit, offset],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // 查詢總數
                    db.query(
                        'SELECT COUNT(*) as total FROM lk_hiking WHERE type_id = ?',
                        [typeId],
                        (countErr, countResults) => {
                            if (countErr) {
                                reject(countErr);
                                return;
                            }

                            const total = countResults[0].total;
                            const totalPages = Math.ceil(total / limit);

                            resolve({
                                data: results,
                                pagination: {
                                    currentPage: parseInt(page),
                                    totalPages: totalPages,
                                    totalItems: total,
                                    itemsPerPage: parseInt(limit)
                                }
                            });
                        }
                    );
                }
            );
        });
    }
};

export default HikingModel;
