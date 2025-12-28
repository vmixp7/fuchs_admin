import db from "../config/db.js";

const ActivityModel = {
    // 獲取活動列表（分頁）
    getByPage: (page = 1, limit = 6) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢總數
            db.query(
                'SELECT COUNT(*) as total FROM lk_activity',
                (countErr, countResults) => {
                    if (countErr) {
                        reject(countErr);
                        return;
                    }

                    const total = countResults[0].total;
                    const totalPages = Math.ceil(total / limit);

                    // 查詢資料
                    db.query(
                        'SELECT * FROM lk_activity ORDER BY id DESC LIMIT ? OFFSET ?',
                        [limit, offset],
                        (err, results) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            // 格式化日期
                            const formattedResults = results.map(row => ({
                                ...row,
                                date: row.startday ? `${row.startday.slice(0, 4)}-${row.startday.slice(4, 6)}-${row.startday.slice(6, 8)}` : ''
                            }));

                            resolve({
                                data: formattedResults,
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
    },
    // 獲取首頁展場活動（限制數量）
    getLimit: (limit) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM lk_activity ORDER BY id DESC limit ${limit}`,
                (err, results) => {
                    if (err) reject(err);
                    else {
                        const formattedResults = results.map(row => ({
                            ...row,
                            date: `${row.startday.slice(0, 4)}-${row.startday.slice(4, 6)}-${row.startday.slice(6, 8)}`
                        }));
                        resolve(formattedResults);
                    }
                }
            );
        });
    },
    // 獲取研討會活動列表（type=2，分頁）
    getSeminarByPage: (page = 1, limit = 6) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 查詢總數
            db.query(
                'SELECT COUNT(*) as total FROM lk_activity WHERE type = 2',
                (countErr, countResults) => {
                    if (countErr) {
                        reject(countErr);
                        return;
                    }

                    const total = countResults[0].total;
                    const totalPages = Math.ceil(total / limit);

                    // 查詢資料
                    db.query(
                        'SELECT * FROM lk_activity WHERE type = 2 ORDER BY id DESC LIMIT ? OFFSET ?',
                        [limit, offset],
                        (err, results) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            // 格式化日期
                            const formattedResults = results.map(row => ({
                                ...row,
                                date: row.startday ? `${row.startday.slice(0, 4)}-${row.startday.slice(4, 6)}-${row.startday.slice(6, 8)}` : ''
                            }));

                            resolve({
                                data: formattedResults,
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

export default ActivityModel;
