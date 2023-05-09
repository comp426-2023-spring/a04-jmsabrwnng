import express from 'express';
import { rps, rpsls } from './lib/a03-jmsabrwnng/lib/rpsls.js';

const app = express();
const port = process.argv.slice(2).find(arg => arg.startsWith('--port='))?.split('=')[1] || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  const result = rps();
  res.json(result);
});

// Endpoint /app/rpsls/
app.get('/app/rpsls/', (req, res) => {
  const result = rpsls();
  res.json(result);
});

// Endpoint /app/rps/play/
/*app.get('/app/rps/play/', (req, res) => {
  let shot
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    shot = 'rock';
  } else if (randomNum < 2 / 3) {
    shot = 'paper';
  } else {
    shot = 'scissors';
  }
  const result = rps(shot);
  res.json(result);
});*/

// Endpoint /app/rps/play/ that accepts shot=(rock|paper|scissors) (URLEncoded) or {"shot":"(rock|paper|scissors)"} (JSON) as request bodies
app.post('/app/rps/play/', (req, res) => {
  // Extract the shot from the request body
  const shot = req.body.shot || req.body;
  
  // Determine the result
  const result = rps(shot)
  
  // Return the response
  res.json(result);
});

// Endpoint /app/rpsls/play/ that accepts shot=(rock|paper|scissors|lizard|Spock) (URLEncoded) or {"shot":"(rock|paper|scissors|lizard|Spock)"} (JSON) as request bodies
app.post('/app/rpsls/play/', (req, res) => {
  // Extract the shot from the request body
  const shot = req.body.shot || req.body;

  // Determine the result
  const result = rps(shot)

  // Return the response
  res.json(result);
});

// Endpoint /app/rpsls/play/
/*app.get('/app/rpsls/play/', (req, res) => {
  let shot
  const randomNum = Math.random();
  if (randomNum < 1 / 5) {
    shot = 'rock';
  } else if (randomNum < 2 / 5) {
    shot = 'paper';
  } else if (randomNum < 3 / 5) {
    shot = 'scissors';
  } else if (randomNum < 4 / 5) {
    shot = 'lizard';
  } else {
    shot = 'Spock';
  }
  const result = rpsls(shot);
  res.json(result);
});*/

// Endpoint /app/rps/play/(rock|paper|scissors)/
app.get('/app/rps/play/:shot', (req, res) => {
  const result = rpsls(req.params.shot);
  res.json(result);
});

// Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/
app.post('/app/rpsls/play/:shot', (req, res) => {
  const result = rpsls(req.params.shot);
  res.json(result);
});

// Endpoint for handling undefined routes
app.use((req, res) => {
  res.sendStatus(404);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
