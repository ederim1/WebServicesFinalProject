const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
  reminder: {
    type: String,
    required: [true, 'The reminder needs content to be added'],
  },
  checkbox: {
    type: Boolean,
    required: false,
  },
  deadline: {
    type: String,
    required: false,
  },
  place: {
    type: String,
    required: false,
  },
  priority: {
    type: Boolean,
    required: false,
  },
  team: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: false,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const themeSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
  },
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [],
});

const reminder = mongoose.model('reminder', reminderSchema);
const user = mongoose.model('user', userSchema);
const theme = mongoose.model('theme', themeSchema);
const team = mongoose.model('team', teamSchema);
module.exports = { reminder, user, theme, team };
