const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeSlotSchema = new Schema(
  {
    subject: { type: mongoose.Types.ObjectId, ref: 'Subject' },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: String, required: true },
    room: { type: Number},
  },
  {
    timestamps: true,
  }
);

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);
module.exports = TimeSlot;