const express = require('express');
const { isValidObjectId } = require('mongoose');
const Subject = require('../models/Subject');

const subjectRouter = express.Router();

subjectRouter.get('/', (req, res, next) => {
    return Subject.find().populate("teachers")
        .then(subjects => {
            return res.status(200).json(subjects);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

subjectRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Subject.findById(id).populate('teachers')
        .then((subject) => {
            if (!subject) {
                const error = new Error('Subject not found');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(subject);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

subjectRouter.post('/', (req, res, next) => {
    const newSubject = new Subject({
        title: req.body.title,
        ECTS: req.body.ECTS,
        teachers: [],
        department: req.body.department,
    })
    return newSubject.save()
        .then(() => {
            return res.status(201).json(newSubject);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

subjectRouter.put('/:id/teachers', (req, res, next) => {
    const subjectId = req.params.id;
    const teacherToAdd = req.body.teacherId;

    return Subject.findByIdAndUpdate(
        subjectId,
        { $push: { teachers: teacherToAdd } },
        { new: true }
    ).populate("teachers")
        .then(subjectUpdated => {
            return res.status(200).json(subjectUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

subjectRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Subject.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Subject with id ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = subjectRouter;