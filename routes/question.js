
/*
 * GET users listing.
 */

exports.addQuestion = function(req, res){
  //res.send("Adding question");
	var db = req.db;
	
	var http = req.http;
	
	var url = "http://localhost:3000/category/java/id";
	
	var request = http.get(url, function (response) {
		var qid;
		var date = req.body.postDate;
		var category = req.body.category;
		var level = req.body.level;
		var question =  req.body.textAreaQuestion;
		var answer = req.body.textAreaAnswer;
		var buffer = "", 
        data,
        route;
	    response.on("data", function (chunk) {
	        buffer += chunk;
	    }); 
	
	    response.on("end", function (err) {
	    	if(err == null) {
	    		data = JSON.parse(buffer);
		        qid = parseInt(data[0].maxId) + 1;	
		    	db.collection('questionlist').insert({"questionId":qid, "postDate":date, "category":category,
		    		"level":level, "textAreaQuestion":question, "textAreaAnswer":answer},function(err,result) {
		    		res.send(
		    				(err == null)? {msg: 'Addeed'} : {msg:err}		
		    		);
		    	})
	    	} else {
	    		res.send({msg:err});
	    	}        
	    }); 
	});
	
};


exports.getQuestionList = function(req, res) {
	var db = req.db;
	db.collection('questionlist').find().toArray(function(err, items) {
		res.json(items);
	});
};

exports.deleteQuestion = function(req, res) {
	var db = req.db;
	db.collection('questionlist').remove({
		"questionId": req.params.qid.toLowerCase(),
	    "category": req.params.category.toLowerCase()
	}, function(err, result) {
		res.send(
				(err == null)? {msg: 'Addeed'} : {msg:err}		
		);
	});
}


exports.getQuestionListCategory = function(req, res) {
	var db = req.db;
	db.collection('questionlist').find({
		"category": req.params.category.toLowerCase()
	}).toArray(function(err, items) {
		if(err != null) {
			res.send({msg:err});
		} else {
			res.json(items);	
		}
	});
}

exports.getQuestionListCategoryLevel = function(req, res) {
	var db = req.db;
	db.collection('questionlist').find({
		"category": req.params.category.toLowerCase(),
		"level": req.params.level.toLowerCase()
	}).toArray(function(err, items) {
		if(err != null) {
			res.send({msg:err});
		} else {
			res.json(items);	
		}
	});
}

exports.getQuestion = function(req, res) {
	var db = req.db;
	db.collection('questionlist').find({
		"category": req.params.category.toLowerCase(),
		"level": req.params.level.toLowerCase(),
		"questionId": req.params.qid.toLowerCase()
	}).toArray(function(err, items) {
		if(err != null) {
			res.send({msg:err});
		} else {
			res.json(items);	
		}
	});
}


exports.getNextQuestionId = function(req, res) {
	
}

