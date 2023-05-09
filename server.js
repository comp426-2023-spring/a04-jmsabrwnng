import express from 'express';
import { rps, rpsls } from './a03-jmsabrwnng/lib/rpsls.js';

const app = express();
const port = process.argv.slice(2).find(arg => arg.startsWith('--port='))?.split('=')[1] || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to set the appropriate headers for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Default API endpoint that returns 404 NOT FOUND for any undefined endpoints
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Endpoint /app/ that returns 200 OK
app.get('/app/', (req, res,next) => {
  res.status(200).send('200 OK');
});

// Endpoint /app/rps/
app.get('/app/rps/', (req, res) => {
  const result = rps();
  res.status(200).json(result);
});

// Endpoint /app/rpsls/
app.get('/app/rpsls/', (req, res) => {
  const result = rpsls();
  res.status(200).json(result);
});

// Endpoint /app/rps/play/ that accepts shot=(rock|paper|scissors) (URLEncoded) or {"shot":"(rock|paper|scissors)"} (JSON) as request bodies
app.post('/app/rps/play/', (req, res) => {
  // Extract the shot from the request body
  const shot = req.body.shot || req.body;
  
  // Determine the result
  const result = rps(shot);
  
  // Return the response
  res.status(200).json(result);
});

// Endpoint /app/rpsls/play/ that accepts shot=(rock|paper|scissors|lizard|Spock) (URLEncoded) or {"shot":"(rock|paper|scissors|lizard|Spock)"} (JSON) as request bodies
app.post('/app/rpsls/play/', (req, res) => {
  // Extract the shot from the request body
  const shot = req.body.shot || req.body;

  // Determine the result
  const result = rpsls(shot);

  // Return the response
  res.status(200).json(result);
});

// Endpoint /app/rps/play/(rock|paper|scissors)/
app.get('/app/rps/play/:shot', (req, res) => {
  const result = rps(req.params.shot);
  res.json(result);
});

// Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/
app.post('/app/rpsls/play/:shot', (req, res) => {
  const result = rpsls(req.params.shot);
  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
