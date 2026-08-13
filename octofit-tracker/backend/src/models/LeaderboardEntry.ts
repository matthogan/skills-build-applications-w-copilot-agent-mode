import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntryModel;