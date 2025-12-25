import QaModel from "../models/qaModel.js";

const QaController = {
    // 獲取所有常見問題
    getAll: async (req, res) => {
        try {
            const qas = await QaModel.getAll();
            res.json(qas);
        } catch (error) {
            console.error("獲取常見問題失敗:", error);
            res.status(500).json({ message: "獲取常見問題失敗" });
        }
    },

    // 根據 ID 獲取單個問題
    getById: async (req, res) => {
        try {
            const qa = await QaModel.getById(req.params.id);
            if (!qa) {
                return res.status(404).json({ message: "常見問題不存在" });
            }
            res.json(qa);
        } catch (error) {
            console.error("獲取常見問題失敗:", error);
            res.status(500).json({ message: "獲取常見問題失敗" });
        }
    },

    // 新增常見問題
    create: async (req, res) => {
        try {
            const { que, ans, num } = req.body;

            if (!que || !ans) {
                return res.status(400).json({ message: "問題和答案為必填項" });
            }

            await QaModel.create(que, ans, num);
            res.status(201).json({ message: "新增成功" });
        } catch (error) {
            console.error("新增常見問題失敗:", error);
            res.status(500).json({ message: "新增常見問題失敗" });
        }
    },

    // 更新常見問題
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { que, ans, num } = req.body;

            if (!que || !ans) {
                return res.status(400).json({ message: "問題和答案為必填項" });
            }

            await QaModel.update(id, que, ans, num);
            res.json({ message: "更新成功" });
        } catch (error) {
            console.error("更新常見問題失敗:", error);
            res.status(500).json({ message: "更新常見問題失敗" });
        }
    },

    // 刪除常見問題
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await QaModel.delete(id);
            res.json({ message: "刪除成功" });
        } catch (error) {
            console.error("刪除常見問題失敗:", error);
            res.status(500).json({ message: "刪除常見問題失敗" });
        }
    }
};

export default QaController;
