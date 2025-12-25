import CompanyActivityModel from "../models/companyActivityModel.js";

const CompanyActivityController = {
    // 獲取公司活動列表（分頁）
    getActivities: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 6; // 固定每頁 6 筆

            const result = await CompanyActivityModel.getByPage(page, limit);
            res.json(result);
        } catch (error) {
            console.error("獲取公司活動列表失敗:", error);
            res.status(500).json({
                message: "獲取公司活動列表失敗",
                error: error.message
            });
        }
    }
};

export default CompanyActivityController;
