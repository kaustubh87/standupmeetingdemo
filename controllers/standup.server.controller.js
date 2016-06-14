var Standup = require('../models/standup.server.model.js');

exports.list = function(req,res){
	var query = Standup.find();
	query.sort({createdOn: 'desc'})
	.limit(12)
	.exec(function(err, results){

		res.render('index',{ title:'Standup - List', notes:results });

	});
};

exports.filterByMember = function(req,res){

	var query = Standup.find();
	var filter = req.body.memberName;

	query.sort({createdOn:'desc'});

	if(filter.length > 0)
	{
		query.where({ memberName: filter });
	}

	query.exec(function(err, results){
		res.render('index',{title: 'Standup - List' , notes: results });

	});


};

/*
var query = Standup.find(); //returns all of the documents.

//callback function

Standup.find(function(err, results))
{

});

Standup.find({memberName:'David'} , 'memberName impediment', function(err, results){



});

//findOne method


var query = Standup.findOne();
query.exec(function(err, results){

});

//with conditions 

var query = Standup.findOne({memberName:'David'});


// findById

var query = Standup.findById(id);

Standup.findById(id).exec(function(err, results){

});

//$gt, $gte, $in , $lt, $lte , $ne $nin -> comparision operators


*/

exports.create = function(req,res){

	var entry = new Standup ({

		memberName: req.body.memberName,
		project: req.body.project,
		workYesterday: req.body.workYesterday,
		workToday: req.body.workToday,
		impediment: req.body.impediment

	});

	entry.save();

	res.redirect(301,'/');
};

exports.getNote = function (req,res){
	res.render('newnote',{title:'Standup - new note'});

}