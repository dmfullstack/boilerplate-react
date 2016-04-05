var express = require('express');

var app = express();

app.use(require('body-parser').json());
app.use(require('connect-livereload')());
app.use(express.static(__dirname + '/../client'));

var data = [
  {id: 1, author: 'Sagar Patke', text: 'This is one comment'},
  {id: 2, author: 'Nishant Jain', text: 'This is another comment'}
];

app.get('/api/comments', function(req, res) {
  res.status(200).json(data);
});

app.post('/api/comments', function(req, res) {
  console.log('Comment received: ' + JSON.stringify(req.body));
  data.push(req.body);
  res.status(200).json(data);
});

exports = module.exports = app;