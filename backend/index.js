const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Task } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.findAll({ order: [['createdAt','DESC']] });
  res.json(tasks);
});

app.get('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, done } = req.body;
  try {
    const task = await Task.create({ title, description, done: !!done });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  const { title, description, done } = req.body;
  await task.update({ title, description, done: !!done });
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  await task.destroy();
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log('Server listening on', PORT);
  try {
    await sequelize.authenticate();
    console.log('Database OK');
  } catch (err) {
    console.error('DB connection error', err);
  }
});
