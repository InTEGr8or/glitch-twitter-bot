var express = require('express'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    util = require('util'),
    app = express(),
    responder = require(__dirname + "/responder/app.js");

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/webhooks/twitter", require(__dirname + "/routes/webhooks/twitter"));

app.get('/', function (req, res) {
  res.render('home', {'project-name': process.env.PROJECT_NAME, 'message': null });
});

app.get("/get-response", function(req, res){
  res.send(responder.getResponse(req.query.q));
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
