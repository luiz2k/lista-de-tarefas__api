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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenRepositories_1 = __importDefault(require("../repositories/tokenRepositories"));
const refresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const findRevokedToken = yield tokenRepositories_1.default.findRevokedToken(refreshToken);
    if (findRevokedToken)
        throw 'O Token está na lista de revogados';
    const findRefreshToken = yield tokenRepositories_1.default.findRefreshToken(refreshToken);
    if (!findRefreshToken)
        throw 'Refresh token inválido';
    if (findRefreshToken) {
        yield tokenRepositories_1.default.addRevokedToken(refreshToken, String(findRefreshToken.userId));
        yield tokenRepositories_1.default.removeRefreshToken(refreshToken);
    }
    const token = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET_JWT, (err, decoded) => {
        if (err)
            throw 'Refresh token inválido';
        const userId = decoded.id;
        const newToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.ACCESS_SECRET_JWT, {
            expiresIn: '1h',
        });
        const newRefreshToken = jsonwebtoken_1.default.sign({ id: userId }, process.env.REFRESH_SECRET_JWT, {
            expiresIn: '7d',
        });
        tokenRepositories_1.default.addRefreshToken(String(userId), newRefreshToken);
        return {
            message: 'Novo token de acesso gerado',
            token: newToken,
            refreshToken: newRefreshToken,
        };
    });
    return token;
});
exports.default = { refresh };
