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
const authRepositories_1 = __importDefault(require("../repositories/authRepositories"));
const tokenRepositories_1 = __importDefault(require("../repositories/tokenRepositories"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res.status(401).send({ error: 'Token inválido' });
    const authorizationSchema = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ');
    const [bearer, token] = authorizationSchema;
    const regex = /^(?!Bearer$).*$/;
    if (regex.test(bearer))
        return res.status(401).send({ error: 'Token inválido' });
    const refreshToken = yield tokenRepositories_1.default.findRefreshToken(token);
    if (refreshToken)
        return res.status(401).send({ error: 'Token inválido' });
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_SECRET_JWT, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(401).send({ error: 'Token inválido' });
        const userId = decoded.id;
        const user = yield authRepositories_1.default.findById(userId);
        if (!user)
            return res.status(401).send({ error: 'Token inválido' });
        req.userId = userId;
        return next();
    }));
});
exports.default = userAuthentication;
