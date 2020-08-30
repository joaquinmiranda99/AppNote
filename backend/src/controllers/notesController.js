const notesController = {};
const Note = require('../models/Note');


notesController.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

notesController.createNotes =  async (req, res)=> {
    const { title , description , author , date } = req.body;
    const newNote = new Note({
        title : title,
        description : description,
        author : author,
        date : date
    });
    await newNote.save()
    res.json({message: 'Note created'})
};

notesController.getNote = async (req, res)=> {
    const note = await Note.findById(req.params.id);
    res.json(note)
};

notesController.updateNote = async (req, res)=> {
    const { title, description, author } = req.body;
    await Note.findOneAndUpdate(req.params.id, { title, description, author }); 
    res.json({message: 'Note updated'})
};

notesController.deleteNote = async (req, res)=> {
    const note = await Note.findOneAndDelete(req.params.id);
    res.json({message: 'Note deleted'})
};

module.exports = notesController;