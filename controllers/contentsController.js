import ContentsModel from "../models/contentsModel.js";

const ContentsController = {
    // 獲取所有內容
    getAll: async (req, res) => {
        try {
            const contents = await ContentsModel.getAll();
            res.json(contents);
        } catch (error) {
            console.error("獲取內容失敗:", error);
            res.status(500).json({
                message: "獲取內容失敗",
                error: error.message
            });
        }
    }
};

export default ContentsController;
