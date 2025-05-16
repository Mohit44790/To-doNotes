
import Note from "../models/Note.js";

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Get the logged-in user from the request (from auth middleware)

    const newNote = new Note({
      title,
      content,
      updatedAt: new Date(),
      synced: false,
      userId,  // Associate the note with the logged-in user
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all notes
export const getNotes = async (req, res) => {
  try {
    const userId = req.user._id; 
    const notes = await Note.find({ userId }); 
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
