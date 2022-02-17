const express = require('express');
const Teacher = require('../models/Teacher');
const fileMiddlewares = require('../middlewares/file.middleware');

const teacherRouter = express.Router();

teacherRouter.get('/', (req, res, next) => {
    let filter = {};
    if (req.query.department) {
        filter = { ...filter, department: req.query.department };
    }

    return Teacher.find(filter)
        .then(teachers => {
            return res.status(200).json(teachers);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

teacherRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Teacher.findById(id)
        .then((teacher) => {
            if (!teacher) {
                const error = new Error('Teacher not found');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(teacher);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

teacherRouter.post('/', [fileMiddlewares.upload.single('image')] ,(req, res, next) => {
    console.log('Teacher received', req.body);
    const imageTeacher = req.file ? req.file.filename :undefined;
    const newTeacher = new Teacher({
        name: req.body.name,
        DNI: req.body.DNI,
        department: req.body.department,
        image: imageTeacher
    });

    return newTeacher.save()
        .then(() => {
            return res.status(201).json(newTeacher);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

teacherRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    return Teacher.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(teacherUpdated => {
            return res.status(200).json(teacherUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

teacherRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Teacher.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Teacher with id: ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = teacherRouter;