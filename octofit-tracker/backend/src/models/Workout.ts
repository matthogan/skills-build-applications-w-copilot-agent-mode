import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    suggestedMinutes: { type: Number, required: true, min: 1 },
    focusArea: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model<Workout>('Workout', workoutSchema);

export default WorkoutModel;