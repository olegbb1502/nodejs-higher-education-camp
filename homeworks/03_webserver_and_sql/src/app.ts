/**
 * For start use command npx ts-node src/app.ts
 * Tested with Postman application
 * 
 * API endpoints
 * POST /users with a JSON body containing a username property
 * GET /users to retrieve a list of all users
 * POST /users With body: {id: <id>} to retrieve a specific user by ID
 * POST /users/update With body: {id: <id>, username: <username} to update a user by ID
 * POST /users/delete With body: {id: <id>} to delete a user by ID
 */

import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { User } from './models/user';

const app = express();
app.use(bodyParser.json());

// Users are stored in session depends list
let users: User[] = [];
// for storing data into file, we should create handler, 
// that will read and write into the file

app.get('/users', (req, res) => {
  const userList = users.map(user => ({
    id: user.id,
    username: user.username,
  }));
  res.json(userList);
});

app.post('/users', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  const user: User = { id: uuidv4(), username };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ id: user.id, username: user.username });
});

app.post('/users/update', (req, res) => {
  const { id, username } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.username = username;
  res.json(user);
});

app.post('/users/delete', (req, res) => {
  const { id } = req.body;
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex < 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
