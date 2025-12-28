import NewsModel from "../models/newsModel.js";

const NewsController = {
    // 獲取所有新聞（支持分頁）
    getAll: async (req, res) => {
        try {
            // 獲取分頁參數
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            // 如果有分頁參數，返回分頁數據
            if (req.query.page || req.query.limit) {
                const result = await NewsModel.getPaginated(page, limit);
                res.json(result);
            } else {
                // 否則返回所有數據（向下兼容）
                const news = await NewsModel.getAll();
                res.json(news);
            }
        } catch (error) {
            console.error("獲取新聞失敗:", error);
            res.status(500).json({
                message: "獲取新聞失敗",
                error: error.message
            });
        }
    }
};

export default NewsController;
