import db from "../config/db.js";

// 格式化日期為 YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const NewsModel = {
    // 獲取所有新聞
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM lk_news ORDER BY createtime DESC, id ASC',
                (err, results) => {
                    if (err) reject(err);
                    else {
                        // 格式化日期
                        const formattedResults = results.map(row => ({
                            ...row,
                            date: formatDate(row.createtime)
                        }));
                        resolve(formattedResults);
                    }
                }
            );
        });
    },
    // 獲取首頁新聞（限制數量）
    getLimit: (limit) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM lk_news ORDER BY createtime DESC, id ASC limit ${limit}`,
                (err, results) => {
                    if (err) reject(err);
                    else {
                        // 格式化日期
                        const formattedResults = results.map(row => ({
                            ...row,
                            date: formatDate(row.createtime)
                        }));
                        resolve(formattedResults);
                    }
                }
            );
        });
    },
    // 獲取新聞分頁數據
    getPaginated: (page, limit) => {
        return new Promise((resolve, reject) => {
            const offset = (page - 1) * limit;

            // 獲取總數
            db.query('SELECT COUNT(*) as total FROM lk_news', (err, countResults) => {
                if (err) {
                    reject(err);
                    return;
                }

                const total = countResults[0].total;
                const totalPages = Math.ceil(total / limit);

                // 獲取分頁數據
                db.query(
                    `SELECT * FROM lk_news ORDER BY createtime DESC, id ASC LIMIT ${limit} OFFSET ${offset}`,
                    (err, results) => {
                        if (err) reject(err);
                        else {
                            // 格式化日期
                            const formattedResults = results.map(row => ({
                                ...row,
                                date: formatDate(row.createtime)
                            }));
                            resolve({
                                data: formattedResults,
                                pagination: {
                                    currentPage: page,
                                    totalPages: totalPages,
                                    totalItems: total,
                                    itemsPerPage: limit
                                }
                            });
                        }
                    }
                );
            });
        });
    }
};

export default NewsModel;
