const { Schema, model } = require('mongoose');

const NoteSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    description: String,
    author : String,
    date : {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true
}); 

module.exports = model('Note', NoteSchema);
