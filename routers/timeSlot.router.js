const express = require('express');
const { isValidObjectId } = require('mongoose');
const TimeSlot = require('../models/TimeSlot');

const timeSlotRouter = express.Router();

timeSlotRouter.get('/', (req, res, next) => {
    return TimeSlot.find().populate("subject")
        .then(timeSlots => {
            return res.status(200).json(timeSlots);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

timeSlotRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return TimeSlot.findById(id).populate('subject')
        .then((timeSlot) => {
            if (!timeSlot) {
                const error = new Error('Time Slot not found');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(timeSlot);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

timeSlotRouter.post('/', (req, res, next) => {
    const newTimeSlot = new TimeSlot({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        room: req.body.room,
    })
    return newTimeSlot.save()
        .then(() => {
            return res.status(201).json(newTimeSlot);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

timeSlotRouter.put('/:id/subject', (req, res, next) => {
    const timeSlotId = req.params.id;
    const SubjectToAdd = req.body.subjectId;

    return TimeSlot.findByIdAndUpdate(
        timeSlotId,
        { $set: { subject:SubjectToAdd } },
        { new: true }
    ).populate("subject")
        .then(timeSlotUpdated => {
            return res.status(200).json(timeSlotUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

timeSlotRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return TimeSlot.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Time Slot with id ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = timeSlotRouter;