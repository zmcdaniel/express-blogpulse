var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var moment = require('moment');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
});

app.get('/', function(req, res) {
  db.post.findAll({
    include: [db.author]
  })
  .then(function(posts) {
    res.render('main/index', { posts: posts });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

app.use('/authors', require('./controllers/authors'));
app.use('/posts', require('./controllers/posts'));

app.use(function(err, req, res, next) {
  res.status(500).render('main/500');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
