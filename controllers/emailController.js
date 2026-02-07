import nodemailer from "nodemailer";
import "dotenv/config";

// 建立郵件傳輸器
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const EmailController = {
  // 發送郵件
  sendEmail: async (req, res) => {
    try {
      const { type } = req.params;
      let subjectName = "";
      let mailContent = "";

      if (type === "jobs") {
        const {
          name,
          sex,
          phone,
          email,
          homePhone,
          birthday,
          school,
          address,
          company,
          title,
          startDate,
          endDate,
          autobiography,
        } = req.body;
        subjectName = `【人才招募】${name} 的履歷`;
        mailContent = `
            姓名：${name || ""}
            性別：${sex || ""}
            手機：${phone || ""}
            E-mail：${email || ""}
            住家電話：${homePhone || ""}
            出生日期：${birthday || ""}
            最高學歷：${school || ""}
            住址：${address || ""}
            前工作單位：${company || ""}
            職稱：${title || ""}
            任職期間：${startDate || ""} 到 ${endDate || ""}
            自傳： ${autobiography || ""}`.trim();
      } else if (type === "inquiry") {
        const {
          name,
          tel,
          email,
          address,
          company,
          title,
          device,
          position,
          usepro,
          quantity,
          question,
        } = req.body;
        subjectName = `【線上詢價】${name} 的詢價`;
        mailContent = `
            姓名：${name || ""}
            聯絡電話：${tel || ""}
            E-mail：${email || ""}
            住址：${address || ""}
            任職公司：${company || ""}
            職稱：${title || ""}
            設備名稱：${device || ""}
            需求潤滑部位：${position || ""}
            目前採用產品：${usepro || ""}
            需求數量(公升)：${quantity || ""}
            其它問題或說明：${question || ""}`.trim();
      } else if (type === "contactus") {
        const { name, tel, area, email, company, title, question } = req.body;
        subjectName = `【聯絡我們】${name} 的訊息`;
        mailContent = `
            姓名：${name || ""}
            聯絡電話：${tel || ""}
            住區：${area || ""}
            E-mail：${email || ""}
            任職公司：${company || ""}
            職稱：${title || ""}
            問題或建議：${question || ""}`.trim();
      }

      // 郵件選項
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "vcnt.chang@gmail.com, vmixp7@gmail.com",
        subject: subjectName,
        text: mailContent,
      };

      // 發送郵件
      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "郵件發送成功" });
    } catch (error) {
      console.error("發送郵件失敗:", error);
      res.status(500).json({
        success: false,
        message: "發送郵件失敗",
        error: error.message,
      });
    }
  },
};

export default EmailController;
