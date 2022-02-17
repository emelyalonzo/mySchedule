const mongoose = require('mongoose');
const db = require('../utils/db');
const Teacher = require('../models/Teacher');

const teachers = [
  {
    name: 'Ursula Perez',
    DNI: '12345678A',
    department: 'Mathematics',
    email: 'up@a.com',
    password: '123',
  },
  {
    name: 'Maria González',
    DNI: '12345678B',
    department: 'Biology',
    email: 'mg@a.com',
    password: '456',
  }
];

const teachersDocuments = teachers.map(teacher => new Teacher(teacher));

db.connectDB()
    .then(async () => {
        const allTeachers = await Teacher.find();
        if (allTeachers.length > 0) {
            await Teacher.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminando información de la DB: ${err}`))
    .then(async () => {
        await Teacher.insertMany(teachersDocuments)
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())