import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  // ─── Auto-Generated Client ID based on Name ───
  clientId: {
    type: String,
    unique: true,
    index: true,
  },

  // ─── Section 1: Student Photo & ID ───
  profileImage: {
    type: String, // Stores image URL or file path (Optional)
    default: null,
  },
  profileImagePreview: {
    type: String, // Optional base64 or preview string
    default: null,
  },

  // ─── Section 2: Personal Information ───
  studentName: {
    type: String,
    required: [true, 'Student Full Name is required'],
    trim: true,
  },
  personalPhone: {
    type: String,
    required: [true, 'Personal Phone is required'],
    trim: true,
  },
  whatsappNumber: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    enum: ['', 'Male', 'Female', 'Other'],
    default: '',
  },
  city: {
    type: String,
    trim: true,
    default: '',
  },
  state: {
    type: String,
    trim: true,
    default: '',
  },

  // ─── Section 3: Academic Background ───
  highestQualification: {
    type: String,
    enum: [
      '',
      'High School (10th)',
      'Intermediate (12th)',
      'Graduation (BCA/BTech/BSc/BA/BCom)',
      'Post Graduation (MCA/MBA/MTech)'
    ],
    default: '',
  },
  passingYear: {
    type: String,
    trim: true,
    default: '',
  },
  percentageOrCgpa: {
    type: String,
    trim: true,
    default: '',
  },
  institutionName: {
    type: String,
    trim: true,
    default: '',
  },

  // ─── Section 4: Counseling & Admission Preference ───
  targetCourse: {
    type: String,
    required: [true, 'Target Course is required'],
    enum: [
      '',
      // Management & Commerce
      'MBA',
      'BBA',
      'B.Com',
      'M.Com',
      // Arts & Humanities
      'B.A (General)',
      'B.A (Honours)',
      'B.A (Economics)',
      'B.A (English)',
      'B.A (Political Science)',
      'B.A (History)',
      'B.A (Psychology)',
      // IT & Engineering
      'B.Tech / B.E',
      'BCA',
      'MCA',
      'B.Sc (IT / Data Science)',
      'M.Tech',
      'PGDM'
    ],
  },
  interestedCollege: {
    type: String,
    trim: true,
    default: '',
  },
  preferredSpecialization: {
    type: String,
    trim: true,
    default: '',
  },
  admissionIntake: {
    type: String,
    enum: ['', 'Fall 2026', 'Spring 2027', 'Immediate / Current Session'],
    default: '',
  },
  admissionAgreed: {
    type: String,
    enum: ['Pending', 'Yes', 'No'],
    default: 'Pending',
  },
  leadStatus: {
    type: String,
    enum: [
      'New Inquiry',
      'Counseling Done',
      'Documents Pending',
      'Ready to Apply',
      'Admission Confirmed',
      'Dropped'
    ],
    default: 'New Inquiry',
  },
  budgetRange: {
    type: String,
    trim: true,
    default: '',
  },

  // ─── Section 5: Assignment & Remarks ───
  assignedCounselor: {
    type: String,
    trim: true,
    default: '',
  },
  nextFollowUpDate: {
    type: Date,
    default: null,
  },
  counselingNotes: {
    type: String,
    trim: true,
    default: '',
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});



const Student = mongoose.model('Student', studentSchema);

export default Student;