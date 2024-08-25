const User = require("../models/Notemodel.js");

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new user
exports.createNotes = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNote = new User({ title, description });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {
    const deletedNote = await User.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
