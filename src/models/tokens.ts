import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
  expire: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
    required: true,
  },
});

const revokedTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  revokedToken: {
    type: String,
    required: true,
  },
  revokedAt: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

const refreshToken = mongoose.model('refreshToken', refreshTokenSchema);
const revokedToken = mongoose.model('revokedToken', revokedTokenSchema);

export default { refreshToken, revokedToken };
