import db from "../config/db.js";
import bcrypt from "bcrypt";

export const findUserByUsername = (username, callback) => {
    db.query("SELECT * FROM fu_users WHERE username = ?", [username], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

// 驗證帳密
export const verifyUserPassword = (username, password, callback) => {
    findUserByUsername(username, (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(null, false);
        // console.log("password--", password, user.password);
        // 比對加密密碼
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return callback(err);
            if (!isMatch) return callback(null, false);
            callback(null, user); // 登入成功
        });
    });
};