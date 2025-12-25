import HikingModel from "../models/hikingModel.js";

const HikingController = {
    // 根據 type_id 獲取登山資料（分頁）
    getByTypeId: async (req, res) => {
        try {
            const typeId = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const limit = 6; // 固定每頁 6 筆

            const result = await HikingModel.getByTypeId(typeId, page, limit);
            res.json(result);
        } catch (error) {
            console.error("獲取登山資料失敗:", error);
            res.status(500).json({
                message: "獲取登山資料失敗",
                error: error.message
            });
        }
    }
};

export default HikingController;
