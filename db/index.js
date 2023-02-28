const { Pool } = require('pg');

const pool = new Pool();

async function query(text, params) {
	try {
		const res = await pool.query(text, params);
		return res;
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	query
}