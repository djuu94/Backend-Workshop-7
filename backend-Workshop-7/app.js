const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'football_db',
  port: 3306 
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get('/leagues', (req, res) => {
  connection.query('SELECT * FROM football_leagues', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/leagues', (req, res) => {
  const { league_name, country, league_founded_year } = req.body;
  connection.query('INSERT INTO football_leagues SET ?', { league_name, country, league_founded_year }, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.put('/leagues/:id', (req, res) => {
  const { league_name, country, league_founded_year } = req.body;
  connection.query('UPDATE football_leagues SET league_name = ?, country = ?, league_founded_year = ? WHERE league_id = ?', [league_name, country, league_founded_year, req.params.id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.delete('/leagues/:id', (req, res) => {
  connection.query('DELETE FROM football_leagues WHERE league_id = ?', [req.params.id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


app.get('/teams', (req, res) => {
    connection.query('SELECT * FROM football_team', (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });

  app.post('/teams', (req, res) => {
    const { team_name, team_titles, league_id } = req.body;
    connection.query('INSERT INTO football_team SET ?', { team_name, team_titles, league_id }, (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });
  

  app.put('/teams/:id', (req, res) => {
    const { team_name, team_titles, league_id } = req.body;
    connection.query('UPDATE football_team SET team_name = ?, team_titles = ?, league_id = ? WHERE team_id = ?', [team_name, team_titles, league_id, req.params.id], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });
  

  app.delete('/teams/:id', (req, res) => {
    connection.query('DELETE FROM football_team WHERE team_id = ?', [req.params.id], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });
  

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});