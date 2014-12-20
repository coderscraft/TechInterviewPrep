
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , question = require('./routes/question')
  , category = require('./routes/category')
  , http = require('http')
  , path = require('path');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/test", {native_parser:true});

var app = express();

app.use(function(req,res,next){
    req.db = db;
    req.http = http;
    next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);

app.post('/question/addquestion',question.addQuestion);
app.get('/question/questionlist',question.getQuestionList);
app.del('/question/delete/:category/:qid',question.deleteQuestion);
app.get('/question/questionlist/:category',question.getQuestionListCategory);
app.get('/question/questionlist/:category/:level',question.getQuestionListCategoryLevel);
app.get('/question/:category/:level/:qid',question.getQuestion);
app.get('/question/:category/nextid',question.getNextQuestionId);
app.post('/category/addcategory',category.addCategory);
app.get('/category/:category/id',category.getCategoryId);






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
