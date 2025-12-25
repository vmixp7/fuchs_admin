import db from "../config/db.js";

// 格式化日期为 YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PromotionModel = {
    // 获取所有促销信息
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT id, data as message, createtime as date, pdf FROM fu_promotions ORDER BY id DESC',
                (err, results) => {
                    if (err) reject(err);
                    else {
                        // 格式化日期
                        const formattedResults = results.map(row => ({
                            ...row,
                            date: formatDate(row.date)
                        }));
                        resolve(formattedResults);
                    }
                }
            );
        });
    },

    // 根据 ID 获取单个促销信息
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT id, data as message, createtime as date, pdf FROM fu_promotions WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else {
                        if (results[0]) {
                            results[0].date = formatDate(results[0].date);
                        }
                        resolve(results[0]);
                    }
                }
            );
        });
    },

    // 新增促销信息
    create: (message, date, pdf) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO fu_promotions (data, createtime, pdf) VALUES (?, ?, ?)',
                [message, date, pdf || ''],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    // 更新促销信息
    update: (id, message, date, pdf) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE fu_promotions SET data = ?, createtime = ?';
            let params = [message, date];

            if (pdf) {
                query += ', pdf = ?';
                params.push(pdf);
            }

            query += ' WHERE id = ?';
            params.push(id);

            db.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // 删除促销信息
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM fu_promotions WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    }
};

export default PromotionModel;
