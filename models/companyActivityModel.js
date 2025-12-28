import db from "../config/db.js";

const CompanyActivityModel = {
    // 獲取公司活動列表（分頁）
    getByPage: (page = 1, limit = 6) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢資料
            db.query(
                'SELECT * FROM lk_company_activity ORDER BY startday DESC LIMIT ? OFFSET ?',
                [limit, offset],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    // 查詢總數
                    db.query(
                        'SELECT COUNT(*) as total FROM lk_company_activity',
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

export default CompanyActivityModel;
