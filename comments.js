// Create web server
// Create a new web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const comments = require('./comments.json');

// Use body parser and cors
app.use(bodyParser.json());
app.use(cors());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const newComment = {
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    timestamp: new Date()
  };
  comments.push(newComment);
  fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
    if(err) {
      return res.status(500).send('Error writing new comment to disk');
    }
    res.json(newComment);
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});