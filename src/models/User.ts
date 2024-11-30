import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  resume: {
    education: [{
      degree: String,
      school: String,
      year: Number,
      description: String
    }],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    skills: [String],
    summary: String
  },
  preferences: {
    desiredRoles: [String],
    locations: [String],
    remotePreference: String,
    salaryRange: {
      min: Number,
      max: Number
    },
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;