const express = require('express');
// const shortid = require('shortid');
const userApi = require('./users/model');

// BUILD YOUR SERVER HERE
const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
	try {
		const result = await userApi.find();
		res.status(200).json(result);
	}
	catch (err) {
		res.status(500).json({ message: "The users information could not be retrieved" });
	}
});

app.get('/api/users/:id', async (req, res) => {
	try {
		const result = await userApi.findById(req.params.id);

		if (result)
			res.status(200).json(result);
		else
			res.status(404).json({ message: "The user with the specified ID does not exist" });
	}
	catch (err) {
		res.status(500).json({ message: "The user information could not be retrieved" });
	}
});

app.post('/api/users', async (req, res) => {
	try {
		const { name, bio } = req.body;

		if (!name || !bio) {
			res.status(400).json({ message: "Please provide name and bio for the user" });
		}
		else {
			const result = await userApi.insert({ name, bio });
			res.status(201).json(result);
		}
	}
	catch (err) {
		res.status(500).json({ message: "There was an error while saving the user to the database" });
	}
});

app.delete('/api/users/:id', async (req, res) => {
	try {
		const result = await userApi.remove(req.params.id);

		if (result)
			res.status(200).json(result);
		else
			res.status(404).json({ message: "The user with the specified ID does not exist" })
	}
	catch (err) {
		res.status(500).json({ message: "The user could not be removed" });
	}
});

// I don't like how many levels of nesting this route has
// STRETCH - fix
app.put('/api/users/:id', async (req, res) => {
	try {
		const { name, bio } = req.body;

		if (!name || !bio) {
			res.status(400).json({ message: "Please provide name and bio for the user" });
		}

		else {
			const result = await userApi.update(req.params.id, { name, bio });

			if (result)
				res.status(200).json(result);
			else
				res.status(404).json({ message: "The user with the specified ID does not exist" });
		}
	}
	catch (err) {
		res.status(500).json({ message: "The user information could not be modified" });
	}
});

module.exports = app; // EXPORT YOUR SERVER instead of {}
