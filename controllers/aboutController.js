import AboutModel from "../models/aboutModel.js";

const AboutController = {
    // 獲取公司簡介
    get: async (req, res) => {
        try {
            let about = await AboutModel.get();

            // 如果沒有記錄，創建一個預設的
            if (!about) {
                await AboutModel.createDefault();
                about = await AboutModel.get();
            }

            res.json(about);
        } catch (error) {
            console.error("獲取公司簡介失敗:", error);
            res.status(500).json({ message: "獲取公司簡介失敗" });
        }
    },

    // 更新公司簡介
    update: async (req, res) => {
        try {
            const { id, content } = req.body;

            if (!content || !content.trim()) {
                return res.status(400).json({ message: "公司簡介內容為必填項" });
            }

            await AboutModel.update(id, content);
            res.json({ message: "更新成功" });
        } catch (error) {
            console.error("更新公司簡介失敗:", error);
            res.status(500).json({ message: "更新公司簡介失敗" });
        }
    }
};

export default AboutController;
