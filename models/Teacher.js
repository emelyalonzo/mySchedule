const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    DNI: { type: String, required: true },
    department: { type: String, required: true },
    image: { type: String}
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;