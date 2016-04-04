var express = require('express');

var app = express();

app.use(require('connect-livereload')());
app.use(express.static(__dirname + '/../client'));

app.get('/api/comments', function(req, res) {
  res.status(200).json([
    {id: 1, author: 'Sagar Patke', text: 'This is one comment'},
    {id: 2, author: 'Nishant Jain', text: 'This is another comment'}
  ]);
});

exports = module.exports = app;