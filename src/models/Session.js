import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      ref: 'user',
      type: Schema.Types.ObjectId,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const SessionCollection = model('session', sessionSchema);
export default SessionCollection;
