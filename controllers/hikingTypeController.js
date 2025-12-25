import HikingTypeModel from "../models/hikingTypeModel.js";

const HikingTypeController = {
    // 獲取所有登山類型
    getAll: async (req, res) => {
        try {
            const hikingTypes = await HikingTypeModel.getAll();
            res.json(hikingTypes);
        } catch (error) {
            console.error("獲取登山類型失敗:", error);
            res.status(500).json({
                message: "獲取登山類型失敗",
                error: error.message
            });
        }
    }
};

export default HikingTypeController;
