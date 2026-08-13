import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    totalPoints: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export type Team = InferSchemaType<typeof teamSchema>;

const TeamModel = model<Team>('Team', teamSchema);

export default TeamModel;