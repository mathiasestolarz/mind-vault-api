const headers = {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
	"Access-Control-Max-Age": 2592000,
	'Content-Type': 'application/json'
};

const notFoundMsg = { message: 'Note Not Found' };

module.exports = {
	headers,
	notFoundMsg
}