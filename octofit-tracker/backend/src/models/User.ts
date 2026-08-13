import { Schema, model, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);

export default UserModel;