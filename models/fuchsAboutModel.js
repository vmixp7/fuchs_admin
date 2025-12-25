import db from "../config/db.js";

const FuchsAboutModel = {
    // 獲取關於資料（lk_about + fu_about 的 about 欄位）
    get: () => {
        return new Promise((resolve, reject) => {
            // 先查詢 lk_about 的資料
            db.query(
                'SELECT * FROM lk_about LIMIT 1',
                (err, lkResults) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!lkResults || lkResults.length === 0) {
                        resolve(null);
                        return;
                    }

                    // 再查詢 fu_about 的 about 欄位
                    db.query(
                        'SELECT about FROM fu_about ORDER BY id DESC LIMIT 1',
                        (fuErr, fuResults) => {
                            if (fuErr) {
                                reject(fuErr);
                                return;
                            }

                            // 合併結果：用 fu_about 的 about 替換 lk_about 的 about
                            const result = {
                                ...lkResults[0],
                                about: fuResults && fuResults.length > 0 ? fuResults[0].about : lkResults[0].about
                            };

                            resolve(result);
                        }
                    );
                }
            );
        });
    }
};

export default FuchsAboutModel;
