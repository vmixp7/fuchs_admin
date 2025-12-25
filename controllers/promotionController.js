import PromotionModel from "../models/promotionModel.js";
import fs from "fs";
import path from "path";

const PromotionController = {
    // 获取所有促销信息
    getAll: async (req, res) => {
        try {
            const promotions = await PromotionModel.getAll();
            res.json(promotions);
        } catch (error) {
            console.error("获取促销信息失败:", error);
            res.status(500).json({ message: "获取促销信息失败" });
        }
    },

    // 根据 ID 获取单个促销信息
    getById: async (req, res) => {
        try {
            const promotion = await PromotionModel.getById(req.params.id);
            if (!promotion) {
                return res.status(404).json({ message: "促销信息不存在" });
            }
            res.json(promotion);
        } catch (error) {
            console.error("获取促销信息失败:", error);
            res.status(500).json({ message: "获取促销信息失败" });
        }
    },

    // 新增促销信息
    create: async (req, res) => {
        try {
            console.log("收到新增请求，body:", req.body);
            console.log("收到新增请求，file:", req.file);

            const { message, date } = req.body;
            const pdf = req.file ? `/uploads/${req.file.filename}` : ''; // 可以是图片或 PDF

            if (!message || !date) {
                console.log("验证失败: message=", message, "date=", date);
                // 如果有上传的文件但验证失败，删除文件
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: "促销信息和日期为必填项" });
            }

            console.log("准备插入数据:", { message, date, pdf });
            const result = await PromotionModel.create(message, date, pdf);
            console.log("插入成功:", result);
            res.status(201).json({ message: "新增成功" });
        } catch (error) {
            console.error("新增促销信息失败:", error);
            console.error("错误堆栈:", error.stack);
            // 如果有上传的文件但保存失败，删除文件
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: "新增促销信息失败: " + error.message });
        }
    },

    // 更新促销信息
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { message, date } = req.body;
            const pdf = req.file ? `/uploads/${req.file.filename}` : null; // 可以是图片或 PDF

            if (!message || !date) {
                // 如果有上传的文件但验证失败，删除文件
                if (req.file) {
                    fs.unlinkSync(req.file.path);
                }
                return res.status(400).json({ message: "促销信息和日期为必填项" });
            }

            // 如果有新上传的文件（图片或 PDF），删除旧的文件
            if (pdf) {
                const oldPromotion = await PromotionModel.getById(id);
                if (oldPromotion && oldPromotion.pdf) {
                    const oldFilePath = path.join(process.cwd(), 'public', oldPromotion.pdf);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                }
            }

            await PromotionModel.update(id, message, date, pdf);
            res.json({ message: "更新成功" });
        } catch (error) {
            console.error("更新促销信息失败:", error);
            // 如果有上传的文件但保存失败，删除文件
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            res.status(500).json({ message: "更新促销信息失败" });
        }
    },

    // 删除促销信息
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            // 获取要删除的促销信息，以便删除相关的文件（图片或 PDF）
            const promotion = await PromotionModel.getById(id);
            if (!promotion) {
                return res.status(404).json({ message: "促销信息不存在" });
            }

            // 删除文件（图片或 PDF）
            if (promotion.pdf) {
                const filePath = path.join(process.cwd(), 'public', promotion.pdf);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            await PromotionModel.delete(id);
            res.json({ message: "删除成功" });
        } catch (error) {
            console.error("删除促销信息失败:", error);
            res.status(500).json({ message: "删除促销信息失败" });
        }
    }
};

export default PromotionController;
