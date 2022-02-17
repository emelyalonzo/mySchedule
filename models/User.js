const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    DNI : { type: String},
    degree : { type: String},
    email : { type: String, required: true },
    password : { type: String, required: true },
    timeSlots: [{ type: mongoose.Types.ObjectId, ref: 'TimeSlot'}],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;