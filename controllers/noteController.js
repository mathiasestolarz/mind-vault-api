const Note = require('../models/noteModel');
const { headers, notFoundMsg } = require('../config/config');


// @desc    Gets all notes
// @route   GET /api/notes
async function getNotes(res) {
	try {
		const notes = await Note.findAll();

		res.writeHead(200, headers);
		res.end(JSON.stringify(notes.rows));
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
			res.writeHead(404, headers);
			res.end(JSON.stringify(notFoundMsg));
		} else {
			res.writeHead(200, headers);
			res.end(JSON.stringify(note.rows[0]));
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

		res.writeHead(201, headers);
		res.end(JSON.stringify(newNote));
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
			res.writeHead(404, headers);
			res.end(JSON.stringify(notFoundMsg));
		} else {
			const { title, content } = req.body;

			const noteData = {
				title: title || note.title,
				content: content || note.content
			};

			const updatedNote = await Note.update(id, noteData);

			res.writeHead(200, headers);

			res.end(JSON.stringify(updatedNote));
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
			res.writeHead(404, headers);
			res.end(JSON.stringify(notFoundMsg));
		} else {
			const deletedNote = await Note.remove(id);

			res.writeHead(200, headers);

			res.end(JSON.stringify(deletedNote));
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