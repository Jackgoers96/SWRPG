const { Schema, model } = require('mongoose');

// Do we need the createdAt object?
//Do we want to keep the comment option?

const contactSchema = new Schema({
  contactText: {
    type: String,
    required: 'You need to leave a contact!',
    minlength: 1,
    maxlength: 1000,
    trim: true,
  },
  parentFolder: {
    type: String,
    trim: true
  },
  snippetName: {
      type: String,
      required: true,
      trim: true
  },
  snippetAuthor: {
      type: String,
      required: true,
      trim: true
  },
 
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
