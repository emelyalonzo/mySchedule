const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    title: { type: String, required: true },
    ECTS: { type: Number, required: true },
    teachers: [{ type: mongoose.Types.ObjectId, ref: 'Teacher' }],
    department: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;