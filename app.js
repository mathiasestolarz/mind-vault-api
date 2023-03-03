const express = require('express');
var cors = require('cors');
require('dotenv').config();
const notesRouter = require('./routes/notes');
const { resourceNotFoundMsg } = require('./config/config');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/', notesRouter);
app.use(function(req, res, next) {
	res.status(404).json(resourceNotFoundMsg);
});

app.listen(port, () => {
	console.log(`Mind Vault API server listening on port ${port}`);
});