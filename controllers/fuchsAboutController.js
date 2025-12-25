import FuchsAboutModel from "../models/fuchsAboutModel.js";

const FuchsAboutController = {
    // 獲取關於資料
    get: async (req, res) => {
        try {
            const aboutData = await FuchsAboutModel.get();

            if (!aboutData) {
                return res.status(404).json({ message: "資料不存在" });
            }

            res.json(aboutData);
        } catch (error) {
            console.error("獲取關於資料失敗:", error);
            res.status(500).json({
                message: "獲取關於資料失敗",
                error: error.message
            });
        }
    }
};

export default FuchsAboutController;
