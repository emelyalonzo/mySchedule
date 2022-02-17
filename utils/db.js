const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL ||'mongodb+srv://admin:admin@myscheduledb.9fcfg.mongodb.net/mySchedule?retryWrites=true&w=majority';

const connectDB = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {connectDB, DB_URL}