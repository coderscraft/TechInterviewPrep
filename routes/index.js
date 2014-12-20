
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { "title": 'Tech Interview Prep!!!', "categories": ["Java","Node"], "levels": ["Simple","Average","Complex"] });
};