const express = require('express');
const router = express.Router();
const isUuid = require('../utils/helpers');
const {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote
} = require('../controllers/noteController');


router.get('/api/notes', async function (req, res, next) {
	await getNotes(res);
});

router.get('/api/note/:id', async function (req, res, next) {
	if (isUuid(req.params.id)) {
		await getNote(res, req.params.id);
	} else {
		next();
	}
});

router.post('/api/note', async function (req, res, next) {
	await createNote(req, res);
});

router.put('/api/note/:id', async function (req, res, next) {
	if (isUuid(req.params.id)) {
		await updateNote(req, res, req.params.id);
	} else {
		next();
	}
});

router.delete('/api/note/:id', async function (req, res, next) {
	if (isUuid(req.params.id)) {
		await deleteNote(res, req.params.id);
	} else {
		next();
	}
});

module.exports = router;