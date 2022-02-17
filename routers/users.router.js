const express = require('express');
const passport = require('passport');
const { isValidObjectId } = require('mongoose');
const User = require('../models/User');

const usersRouter = express.Router();


usersRouter.post('/register', (req, res, next) => {
    passport.authenticate('register', (error, user) => {
        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(user)
        });
    })(req);
});


usersRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if (error) return next(error)

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(200).json(user)
        });
    })(req);
});

usersRouter.post('/logout', (req, res, next) => {
    if (req.user) {
      req.logout();
  
      req.session.destroy(() => {
        // Eliminamos la cookie de sesión
        res.clearCookie('connect.sid');
        return res.status(200).json('Goodbye!');
      });
    } else {
      return res.sendStatus(304); // Si no hay usuario, no habremos cambiado nada
    }
  });

//Add timeslots to user
usersRouter.put('/timeSlot', (req, res, next) => {
    const userId = req.user.id;
    const timeSlotToAdd = req.body.timeSlotId;

    return User.findByIdAndUpdate(
        userId,
        { $push: { timeSlots: timeSlotToAdd } },
        { new: true }
    ).populate("timeSlots")
        .then(userUpdated => {
            return res.status(200).json(userUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

usersRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return User.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`User with id ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = usersRouter;