import express from 'express';
import { rps, rpsls } from './a03-jmsabrwnng/lib/rpsls.js';

const app = express();
const port = process.argv.slice(2).find(arg => arg.startsWith('--port='))?.split('=')[1] || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/app', (req, res) => {
    res.status(200).send("200 OK").end();
});

app.get('/app/rps', (req, res) => {
    res.status(200).send(JSON.stringify(rps())).end();
});

app.get('/app/rpsls', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls())).end();
});

app.get('/app/rps/play', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.query.shot))).end();
});

app.get('/app/rps/play/:shot', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.params.shot))).end();
});

app.post('/app/rps/play', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.body.shot))).end();
});

app.get('/app/rpsls/play/:shot', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.params.shot))).end();
});

app.get('/app/rpsls/play', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.query.shot))).end();
});

app.post('/app/rpsls/play', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.body.shot))).end();
});

app.get('/app/*', (req,res) =>{
    //Throw a 404 error for other inputs
    res.status(404).send("404 NOT FOUND");
});

app.listen(port);
