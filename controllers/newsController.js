import NewsModel from "../models/newsModel.js";

const NewsController = {
    // 獲取所有新聞
    getAll: async (req, res) => {
        try {
            const news = await NewsModel.getAll();
            res.json(news);
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
