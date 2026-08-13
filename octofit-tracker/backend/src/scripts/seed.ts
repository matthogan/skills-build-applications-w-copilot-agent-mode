import mongoose from 'mongoose';
import UserModel from '../models/User';
import TeamModel from '../models/Team';
import ActivityModel from '../models/Activity';
import LeaderboardEntryModel from '../models/LeaderboardEntry';
import WorkoutModel from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({})
    ]);

    const users = await UserModel.insertMany([
      { username: 'fit_paul', email: 'paul@mergington.edu', fullName: 'Paul Octo', points: 1450 },
      { username: 'jcat_runner', email: 'jessica@mergington.edu', fullName: 'Jessica Cat', points: 1320 },
      { username: 'max_sprint', email: 'max@mergington.edu', fullName: 'Max Sprint', points: 1200 },
      { username: 'lina_lifts', email: 'lina@mergington.edu', fullName: 'Lina Lifts', points: 980 }
    ]);

    const userByUsername = new Map(users.map((user) => [user.username, user._id]));

    await TeamModel.insertMany([
      {
        name: 'Cardio Crushers',
        members: [userByUsername.get('fit_paul'), userByUsername.get('jcat_runner')],
        totalPoints: 2770
      },
      {
        name: 'Strength Squad',
        members: [userByUsername.get('max_sprint'), userByUsername.get('lina_lifts')],
        totalPoints: 2180
      }
    ]);

    await ActivityModel.insertMany([
      {
        user: userByUsername.get('fit_paul'),
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 380,
        pointsEarned: 220,
        date: new Date('2026-08-10T09:00:00.000Z')
      },
      {
        user: userByUsername.get('jcat_runner'),
        type: 'Cycling',
        durationMinutes: 45,
        caloriesBurned: 450,
        pointsEarned: 260,
        date: new Date('2026-08-11T14:30:00.000Z')
      },
      {
        user: userByUsername.get('max_sprint'),
        type: 'HIIT',
        durationMinutes: 30,
        caloriesBurned: 420,
        pointsEarned: 240,
        date: new Date('2026-08-12T16:15:00.000Z')
      },
      {
        user: userByUsername.get('lina_lifts'),
        type: 'Strength Training',
        durationMinutes: 40,
        caloriesBurned: 360,
        pointsEarned: 210,
        date: new Date('2026-08-12T17:00:00.000Z')
      }
    ]);

    await LeaderboardEntryModel.insertMany([
      { user: userByUsername.get('fit_paul'), points: 1450, rank: 1 },
      { user: userByUsername.get('jcat_runner'), points: 1320, rank: 2 },
      { user: userByUsername.get('max_sprint'), points: 1200, rank: 3 },
      { user: userByUsername.get('lina_lifts'), points: 980, rank: 4 }
    ]);

    await WorkoutModel.insertMany([
      {
        user: userByUsername.get('fit_paul'),
        title: 'Tempo Run Builder',
        difficulty: 'Intermediate',
        suggestedMinutes: 40,
        focusArea: 'Endurance'
      },
      {
        user: userByUsername.get('jcat_runner'),
        title: 'Hill Climb Intervals',
        difficulty: 'Advanced',
        suggestedMinutes: 35,
        focusArea: 'Cardio Power'
      },
      {
        user: userByUsername.get('max_sprint'),
        title: 'Explosive HIIT Circuit',
        difficulty: 'Intermediate',
        suggestedMinutes: 30,
        focusArea: 'Speed and Agility'
      },
      {
        user: userByUsername.get('lina_lifts'),
        title: 'Core Strength Foundations',
        difficulty: 'Beginner',
        suggestedMinutes: 25,
        focusArea: 'Core Stability'
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
