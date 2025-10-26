import { verifyUserPassword } from "../models/UserModel.js";

export const showLogin = (req, res) => {
    // 如果已登入就直接導向後台
    if (req.session.user) {
        return res.redirect("/admin");
    }
    res.render("login", { title: "登入", message: null });
};

export const login = (req, res) => {
    const { username, password } = req.body;

    verifyUserPassword(username, password, (err, user) => {
        if (err) {
            return res.render("login", { title: "登入", message: "伺服器錯誤，請稍後再試" });
        }
        if (!user) {
            return res.render("login", { title: "登入", message: "帳號或密碼錯誤" });
        }

        // 登入成功後寫入 session
        req.session.user = user;
        res.redirect("/dashboard");
    });
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};
