import db from "../config/db.js";

const QaModel = {
    // 獲取所有常見問題
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM fu_qa ORDER BY num ASC, id DESC',
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 根據 ID 獲取單個問題
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM fu_qa WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results[0]);
                }
            );
        });
    },

    // 新增常見問題
    create: (que, ans, num) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO fu_qa (que, ans, num) VALUES (?, ?, ?)',
                [que, ans, num || 0],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 更新常見問題
    update: (id, que, ans, num) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE fu_qa SET que = ?, ans = ?, num = ? WHERE id = ?',
                [que, ans, num, id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 刪除常見問題
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM fu_qa WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 獲取常見問題列表（分頁）
    getByPage: (page = 1, limit = 10) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢總數
            db.query(
                'SELECT COUNT(*) as total FROM fu_qa',
                (countErr, countResults) => {
                    if (countErr) {
                        reject(countErr);
                        return;
                    }

                    const total = countResults[0].total;
                    const totalPages = Math.ceil(total / limit);

                    // 查詢資料
                    db.query(
                        'SELECT * FROM fu_qa ORDER BY num ASC, id DESC LIMIT ? OFFSET ?',
                        [limit, offset],
                        (err, results) => {
                            if (err) {
                                reject(err);
                                return;
                            }

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

export default QaModel;
