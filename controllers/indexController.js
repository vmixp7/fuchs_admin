import ActivityModel from "../models/activityModel.js";
import NewsModel from "../models/newsModel.js";
import PromotionModel from "../models/promotionModel.js";

const NewsController = {
    // 獲取首頁資料
    getAll: async (req, res) => {
        try {
            const [news, act, promo] = await Promise.all([
                NewsModel.getLimit(5),
                ActivityModel.getLimit(3),
                PromotionModel.getLimit(3)
            ]);

            res.json({
                news,
                activity: act,
                promotion: promo
            });
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
