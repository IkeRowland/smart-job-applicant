import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  jobDescription: String,
  applicationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'applied', 'rejected', 'interview', 'offer', 'accepted'],
    default: 'pending'
  },
  applicationData: {
    resumeVersion: String,
    coverLetter: String,
    answers: [{
      question: String,
      answer: String
    }]
  },
  source: {
    platform: String,
    jobUrl: String
  },
  aiGenerated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default Application;