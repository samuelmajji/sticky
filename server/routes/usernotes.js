const express = require("express");
const {
  getNotes,
  createNotes,
  deleteNote,
} = require("../controllers/getNotes.js");

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNotes);
router.post("/delete", deleteNote);

module.exports = router;
