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
                            createtime: formatDate(row.createtime)
                        }));
                        resolve(formattedResults);
                    }
                }
            );
        });
    }
};

export default NewsModel;
