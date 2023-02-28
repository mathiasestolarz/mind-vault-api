const { v4: uuidv4 } = require('uuid');
const { query } = require('../db/index');


function findAll() {
	return new Promise(async (resolve, reject) => {
		const text = 'SELECT * FROM notes;';
		const notes = query(text);
		resolve(notes);
	});
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const text = 'SELECT * FROM notes WHERE id = $1;';
		const params = [id];
		const result = query(text, params);
		resolve(result);
	});
}

function create(note) {
	return new Promise((resolve, reject) => {
		const newNote = { id: uuidv4(), ...note };
		const text = 'INSERT INTO notes (id, title, content) VALUES($1, $2, $3);';
		const params = [newNote.id, newNote.title, newNote.content];
		query(text, params);
		resolve(newNote);
	});
}

function update(id, noteDataToEdit) {
	return new Promise((resolve, reject) => {
		const text = 'UPDATE notes SET title = $1, content = $2 WHERE id = $3;';
		const params = [noteDataToEdit.title, noteDataToEdit.content, id];
		const result = query(text, params);
		resolve(result);
	});
}

function remove(id) {
	return new Promise((resolve, reject) => {
		const text = 'DELETE FROM notes WHERE id = $1;';
		const params = [id];
		const removedNote = query(text, params);
		resolve(removedNote);
	});
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove
}