const Note = require('../models/noteModel');
const { noteNotFoundMsg } = require('../config/config');


// @desc    Gets all notes
// @route   GET /api/notes
async function getNotes(res) {
	try {
		const notes = await Note.findAll();

		res.json(notes.rows);
	} catch (error) {
		console.log(error);
	}
}

// @desc    Gets single note
// @route   GET /api/note/:id
async function getNote(res, id) {
	try {
		const note = await Note.findById(id);

		if (!note) {
			res.status(404).json(noteNotFoundMsg);
		} else {
			res.json(note.rows[0]);
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc    Creates a note
// @route   POST /api/note
async function createNote(req, res) {
	try {
		const { title, content } = req.body;

		const note = {
			title,
			content
		};

		const newNote = await Note.create(note);

		res.status(201).json(newNote);
	} catch (error) {
		console.log(error);
	}
}

// @desc    Updates a note
// @route   PUT /api/note/:id
async function updateNote(req, res, id) {
	try {
		const note = (await Note.findById(id)).rows[0];

		if (!note) {
			res.status(404).json(noteNotFoundMsg);
		} else {
			const { title, content } = req.body;

			const noteData = {
				title: title || note.title,
				content: content || note.content
			};

			const updatedNote = await Note.update(id, noteData);

			res.json(updatedNote);
		}
	} catch (error) {
		console.log(error);
	}
}

// @desc    Deletes a note
// @route   DELETE /api/note/:id
async function deleteNote(res, id) {
	try {
		const note = await Note.findById(id);

		if (!note.rowCount) {
			res.status(404).json(noteNotFoundMsg);
		} else {
			const deletedNote = await Note.remove(id);

			res.json(deletedNote);
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote
}