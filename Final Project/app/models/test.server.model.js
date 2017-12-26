// Load the module dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'TestSchema'
const TestSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    fname: {
        type: String,
        default: '',
        trim: true,
        required: 'First name cannot be blank'
    },
    lname: {
        type: String,
        default: '',
        trim: true,
        required: 'Last name cannot be blank'
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please provide a valid email address"],
        required: 'Email cannot be blank'
    },
    phone: {
        type: String,
        default: 'No phone number provided',
        match: [/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please provide a valid phone number."]
    },
    information:{
        type: String,
        default: ''
    },
    term:{
        type: String,
        default: ''
    },
    program:{
        type: String,
        default: ''
       
    },
   
});

// Create the 'Test' model out of the 'TestSchema'
mongoose.model('Test', TestSchema);