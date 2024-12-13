const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
  };
app.use(cors(corsOptions));
app.use(express.json());

// In-memory array to store to-do items
let todos = [
    { id: 1, title: 'Learn React', description: 'Study the React documentation', completed: false },
    { id: 2, title: 'Build a To-Do App', description: 'Create a to-do app with CRUD operations', completed: false },
    { id: 3, title: 'Test the App', description: 'Ensure all features work as expected', completed: false }
];

// GET /todos - Retrieve all to-do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos - Create a new to-do item
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
        id: todos.length + 1,
        title,
        description: description || '',
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id - Retrieve a single to-do item by ID
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
    }

    res.json(todo);
});

// PUT /todos/:id - Update a to-do item by ID
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = todos.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

// DELETE /todos/:id - Delete a to-do item by ID
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(t => t.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})