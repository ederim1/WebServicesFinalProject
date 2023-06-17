const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema(
    {
        reminder:{
            type: String,
            required: [true, "The reminder needs content to be added"]
        },
        check:{
            type: Boolean,
            required: false
        },
        title:{
            type: String,
            required: false
        },
        deadline:{
            type: String,
            required: false
        },
        place: {
            type: String,
            required: false
        },
        priority: {
            type: Boolean,
            required: false
        },
        friend: {
            type: Boolean,
            required: false
        },
        user: {
    
        }

    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true
        }
    }
);

const themeSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            required: true
        }, 
        font: {
            type: String,
            required: true
        }
    }
);

const friendSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true
        }
    }
);

const reminder = mongoose.model('reminder', reminderSchema);
const user = mongoose.model('user', userSchema);
const theme = mongoose.model('theme', themeSchema);
const friend = mongoose.model('friend', friendSchema);
module.exports = {reminder, user, theme, friend};