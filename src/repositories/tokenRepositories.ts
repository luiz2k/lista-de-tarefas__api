import tokens from '../models/tokens';

const addRefreshToken = (userId: string, refreshToken: string) =>
  tokens.refreshToken.create({ userId, refreshToken });

const findRefreshToken = (refreshToken: string) =>
  tokens.refreshToken.findOne({ refreshToken });

const removeRefreshToken = (refreshToken: string) =>
  tokens.refreshToken.deleteOne({ refreshToken });

const findRevokedToken = (revokedToken: string) =>
  tokens.revokedToken.findOne({ revokedToken });

const addRevokedToken = (revokedToken: string, userId: string) =>
  tokens.revokedToken.create({ revokedToken, userId });

export default {
  addRefreshToken,
  findRefreshToken,
  removeRefreshToken,
  findRevokedToken,
  addRevokedToken,
};
