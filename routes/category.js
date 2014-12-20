
exports.addCategory = function(req, res) {
	var db = req.db;
	db.collection("category").insert(req.body,function(err,result) {
		res.send(
				(err == null)? {msg: 'Addeed'} : {msg:err}		
		);
	})
} 


exports.getCategoryId = function(req, res) {
	var db = req.db;
	db.collection("category").find({"name": req.params.category.toLowerCase()},{"maxId":1, _id:0}).toArray(function(err, items) {
		if(err != null) {
			res.send({msg:err});
		} else {
			res.json(items);	
		}
	});
}