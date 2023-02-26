const express = require('express');
require('dotenv').config();
const notesRouter = require('./routes/notes');
const { headers, notFoundMsg } = require('./config/config');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/', notesRouter);
app.use(function(req, res, next) {
	res.writeHead(404, headers);
	res.end(JSON.stringify(notFoundMsg));
});

app.listen(port, () => {
	console.log(`Mind Vault API server listening on port ${port}`);
});