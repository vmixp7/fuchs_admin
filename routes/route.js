import express from "express";
import { showLogin, login, logout } from "../controllers/authController.js";
import { getAutomotive } from "../controllers/fuchsController.js";
import { proxyAutomotive, fuchs } from "../controllers/proxyController.js";
import PromotionController from "../controllers/promotionController.js";
import AboutController from "../controllers/aboutController.js";
import ActivityController from "../controllers/activityController.js";
import HikingTypeController from "../controllers/hikingTypeController.js";
import HikingController from "../controllers/hikingController.js";
import NewsController from "../controllers/newsController.js";
import QaController from "../controllers/qaController.js";
import CompanyActivityController from "../controllers/companyActivityController.js";
import FuchsAboutController from "../controllers/fuchsAboutController.js";
import IndexController from "../controllers/indexController.js";
import ContentsController from "../controllers/contentsController.js";
import EmailController from "../controllers/emailController.js";
import upload from "../config/upload.js";
import bcrypt from "bcrypt";
import { findUserByUsername, updatePassword } from "../models/userModel.js";

const router = express.Router();

router.get("/", showLogin);
router.post("/login", login);
router.get("/logout", logout);
router.get("/proxy/automotive", proxyAutomotive);
router.get("/fuchs/automotive", getAutomotive);
router.get("/proxy/fuchs", fuchs);

router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("dashboard", { username: req.session.user.username });
});
router.get("/promotion", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("promotion", { username: req.session.user.username });
});
router.get("/about", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("about", { username: req.session.user.username });
});
router.get("/qa", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("qa", { username: req.session.user.username });
});

// 修改密碼 API 路由
router.put("/api/change-password", async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "未登入" });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "請填寫所有欄位" });
  }

  try {
    const user = await new Promise((resolve, reject) => {
      findUserByUsername(req.session.user.username, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });

    if (!user) return res.status(404).json({ message: "使用者不存在" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "目前密碼錯誤" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await updatePassword(user.id, hashedPassword);
    res.json({ message: "密碼修改成功" });
  } catch (error) {
    res.status(500).json({ message: "密碼修改失敗" });
  }
});

// 促销信息 API 路由
router.get("/api/promotions", PromotionController.getAll);
router.get("/api/promotions/:id", PromotionController.getById);
router.post(
  "/api/promotions",
  upload.single("pdf"),
  PromotionController.create,
);
router.put(
  "/api/promotions/:id",
  upload.single("pdf"),
  PromotionController.update,
);
router.delete("/api/promotions/:id", PromotionController.delete);

// 公司簡介 API 路由
router.get("/api/about", AboutController.get);
router.put("/api/about", AboutController.update);

// 活動 API 路由
router.get("/api/activities", ActivityController.getActivities);

// 研討會 API 路由
router.get("/api/seminar", ActivityController.getSeminars);

// 登山類型 API 路由
router.get("/api/hiking-types", HikingTypeController.getAll);

// 登山資料 API 路由
router.get("/api/hiking/:id", HikingController.getByTypeId);

// 新聞 API 路由
router.get("/api/news", NewsController.getAll);

// 常見問題 API 路由
router.get("/api/qa", QaController.getAll);
router.get("/api/qa/:id", QaController.getById);
router.post("/api/qa", QaController.create);
router.put("/api/qa/:id", QaController.update);
router.delete("/api/qa/:id", QaController.delete);

// 公司活動 API 路由
router.get("/api/company-activities", CompanyActivityController.getActivities);

// Fuchs 關於資料 API 路由
router.get("/api/fuchs-about", FuchsAboutController.get);
router.get("/api/index", IndexController.getAll);

// 內容 API 路由
router.get("/api/contents", ContentsController.getAll);

// 發送郵件 API 路由
router.post("/api/send-email/:type", EmailController.sendEmail);

export default router;
