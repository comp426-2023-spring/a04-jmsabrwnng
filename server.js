import express from 'express';
import { rps, rpsls } from './lib/lib/rpsls.js';

const app = express();
const port = process.argv[2] || 5000;

// Default API endpoint
app.get('/', (req, res) => {
  res.sendStatus(404);
});

// Check endpoint at /app/
app.get('/app/', (req, res) => {
  res.sendStatus(200);
});

// Endpoint /app/rps/
app.get('/app/rps/', (req, res) => {
  res.json({ player: '(rock|paper|scissors)' });
});

// Endpoint /app/rpsls/
app.get('/app/rpsls/', (req, res) => {
  res.json({ player: '(rock|paper|scissors|lizard|spock)' });
});

// Endpoint /app/rps/play/
app.get('/app/rps/play/', (req, res) => {
  const { shot } = req.body;

  if (!shot) {
    res.status(400).json({ error: 'Missing required field: shot' });
    return;
  }

  const result = rps(shot);
  res.json(result); 
});

// Endpoint /app/rpsls/play/
app.post('/app/rpsls/play/', (req, res) => {
  const { shot } = req.body;
  const result = rpsls(shot);
  res.json(result);
});

// Endpoint /app/rpsls/play/(rock|paper|scissors)/
app.get('/app/rpsls/play/:shot', (req, res) => {
  const { shot } = req.params;
  const result = rpsls(shot);
  res.json(result);
});

// Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/
app.get('/app/rpsls/play/:shot', (req, res) => {
  const { shot } = req.params;
  const result = rpsls(shot);
  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
