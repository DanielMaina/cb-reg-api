"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../config/generateToken");
const sendMail_1 = __importDefault(require("../config/sendMail"));
const valid_1 = require("../middleware/valid");
const sendSMS_1 = require("../config/sendSMS");
const google_auth_library_1 = require("google-auth-library");
// import fetch from 'node-fetch'
const client = new google_auth_library_1.OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const CLIENT_URL = `${process.env.BASE_URL}`;
const authCtrl = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, account, password } = req.body;
            const user = yield userModel_1.default.findOne({ account });
            if (user)
                return res.status(400).json({ msg: 'Email or Phone number already exists.' });
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const newUser = { name, account, password: passwordHash };
            const active_token = (0, generateToken_1.generateActiveToken)({ newUser });
            const url = `${CLIENT_URL}/active/${active_token}`;
            if ((0, valid_1.validateEmail)(account)) {
                (0, sendMail_1.default)(account, url, "Verify your email address");
                return res.json({ msg: "Success! Please check your email." });
            }
            else if ((0, valid_1.validPhone)(account)) {
                (0, sendSMS_1.sendSms)(account, url, "Verify your phone number");
                return res.json({ msg: "Success! Please check phone." });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    activeAccount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { active_token } = req.body;
            const decoded = jsonwebtoken_1.default.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`);
            const { newUser } = decoded;
            if (!newUser)
                return res.status(400).json({ msg: "Invalid authentication." });
            const user = yield userModel_1.default.findOne({ account: newUser.account });
            if (user)
                return res.status(400).json({ msg: "Account already exists." });
            const new_user = new userModel_1.default(newUser);
            yield new_user.save();
            res.json({ msg: "Account has been activated!" });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { account, password } = req.body;
            const user = yield userModel_1.default.findOne({ account });
            if (!user)
                return res.status(400).json({ msg: 'This account does not exits.' });
            // if user exists
            loginUser(user, password, res);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie('refreshtoken', { path: `/api/refresh_token` });
            return res.json({ msg: "Logged out!" });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
                return res.status(400).json({ msg: "Please login now!" });
            const decoded = jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
            if (!decoded.id)
                return res.status(400).json({ msg: "Please login now!" });
            const user = yield userModel_1.default.findById(decoded.id).select("-password");
            if (!user)
                return res.status(400).json({ msg: "This account does not exist." });
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            res.json({ access_token, user });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id_token } = req.body;
            const verify = yield client.verifyIdToken({
                idToken: id_token, audience: `${process.env.MAIL_CLIENT_ID}`
            });
            const { email, email_verified, name, picture } = verify.getPayload();
            if (!email_verified)
                return res.status(500).json({ msg: "Email verification failed." });
            const password = email + 'your google secrect password';
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const user = yield userModel_1.default.findOne({ account: email });
            if (user) {
                loginUser(user, password, res);
            }
            else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture,
                    type: 'google'
                };
                registerUser(user, res);
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    facebookLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, userID } = req.body;
            const URL = `
        https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
      `;
            const data = yield fetch(URL)
                .then(res => res.json())
                .then(res => { return res; });
            const { email, name, picture } = data;
            const password = email + 'your facebook secrect password';
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const user = yield userModel_1.default.findOne({ account: email });
            if (user) {
                loginUser(user, password, res);
            }
            else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture.data.url,
                    type: 'facebook'
                };
                registerUser(user, res);
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    loginSMS: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { phone } = req.body;
            const data = yield (0, sendSMS_1.smsOTP)(phone, 'sms');
            res.json(data);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    smsVerify: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { phone, code } = req.body;
            const data = yield (0, sendSMS_1.smsVerify)(phone, code);
            if (!(data === null || data === void 0 ? void 0 : data.valid))
                return res.status(400).json({ msg: "Invalid Authentication." });
            const password = phone + 'your phone secrect password';
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const user = yield userModel_1.default.findOne({ account: phone });
            if (user) {
                loginUser(user, password, res);
            }
            else {
                const user = {
                    name: phone,
                    account: phone,
                    password: passwordHash,
                    type: 'sms'
                };
                registerUser(user, res);
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
};
const loginUser = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        let msgError = user.type === 'register'
            ? 'Password is incorrect.'
            : `Password is incorrect. This account login with ${user.type}`;
        return res.status(400).json({ msg: msgError });
    }
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id });
    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    });
    res.json({
        msg: 'Login Success!',
        access_token,
        user: Object.assign(Object.assign({}, user._doc), { password: '' })
    });
});
const registerUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new userModel_1.default(user);
    yield newUser.save();
    const access_token = (0, generateToken_1.generateAccessToken)({ id: newUser._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: newUser._id });
    res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
    });
    res.json({
        msg: 'Login Success!',
        access_token,
        user: Object.assign(Object.assign({}, newUser._doc), { password: '' })
    });
});
exports.default = authCtrl;
//comment
