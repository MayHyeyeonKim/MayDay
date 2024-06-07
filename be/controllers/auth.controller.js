require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: "success", user, token });
            }
        }
        throw new Error("Invalid email or password");
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

authController.authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("Authentication token does not exist!");
        }
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                console.log("토큰 검증 오류: ", error);
                return res.status(401).json({ status: "fail", message: "Invalid token" });
            }
            req.userId = payload._id;
            next(); 
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

authController.checkAdminPermission = async(req, res, next) => {
    try{
        //token값으로 유저가 권한이 있는지 없는 지 확인 가능
        const { userId } = req
        const user = await User.findById(userId);
        if(user.level !== "admin") throw new Error("no permission")
        next()
    }catch(error){
        res.status(400).json({status:"fail", error:error.message})
    }
};

module.exports = authController;
