var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res) {
    var collection = db.get('videos');
    var search1 = req.query.search;
    var searchCriteria={};
    if(search1)
    {
    	searchCriteria = { "title": { "$regex": search1, "$options": "i" }};
    }
    collection.find(searchCriteria, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

router.get('/:id',function(req,res){
	var collection = db.get('videos');
	collection.findOne({_id: req.params.id},function(err,videos)
	{
		if (err) throw err;
      	res.json(videos);
	});
});
 router.put('/:id', function(req, res)
    { var collection = db.get('videos'); 
    collection.update(
        {_id: req.params.id },
        {
            title: req.body.title, 
            description: req.body.description
        },
             function(err, video)
             { 
                if (err) throw err;
                res.json(video); 
            });
    });

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});
 router.delete('/:id', function(req, res)
 {
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, 
    function(err, video)
    {
    if (err) throw err; res.json(video);
    }); 
});

module.exports = router;