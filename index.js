const express = require("express")

const app = express()

app.use(express.json())

const todos = [
	{
		id: 1,
		title: "My Todo",
		description: "This is description;",
	},
	{
		id: 2,
		title: "My Todo 2",
		description: "This is description;",
	},
	{
		id: 31,
		title: "My Todo 3",
		description: "This is description;",
	},
]

app.get("/", (req, res) => {
	res.send(todos)
})

app.get("/:id", (req, res) => {
	let result = todos.find(todo => todo.id == req.params.id)
	res.send(result)
})

app.post("/", (req, res) => {
	let todo = {
		id: new Date(),
		title: req.body.title,
		description: req.body.description,
	}
	todos.push(todo)
	res.send(todo)
})

app.put("/:id", (req, res) => {
	let test = todos.find(todo => todo.id == req.params.id)

	if (test) {
		test.title = req.body.title
		test.description = req.body.description
	}

	console.log(todos)
	res.send(test)
})

app.delete("/:id", (req, res) => {
	let index = todos.findIndex(todo => todo.id == req.params.id)
	console.log(index)
	if (index != -1) todos.splice(index, 1)

	console.log(todos)
	res.send(todos)
})

const port = 3000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
