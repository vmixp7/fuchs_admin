import ActivityModel from "../models/activityModel.js";

const ActivityController = {
    // 獲取活動列表（分頁）
    getActivities: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 6; // 固定每頁 6 筆

            const result = await ActivityModel.getByPage(page, limit);
            res.json(result);
        } catch (error) {
            console.error("獲取活動列表失敗:", error);
            res.status(500).json({
                message: "獲取活動列表失敗",
                error: error.message
            });
        }
    },
    // 獲取研討會活動列表（type=2，分頁）
    getSeminars: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 6; // 固定每頁 6 筆

            const result = await ActivityModel.getSeminarByPage(page, limit);
            res.json(result);
        } catch (error) {
            console.error("獲取研討會活動列表失敗:", error);
            res.status(500).json({
                message: "獲取研討會活動列表失敗",
                error: error.message
            });
        }
    }
};

export default ActivityController;
